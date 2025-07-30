import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import type { product, } from "../types/types";
import { useAuth } from "./useAuth";
import { useModal } from "./useModal";

export const useCart = () => {
    const [cart, setCart] = useState<product[]>([]);
    const [orders, setOrders] = useState<product[]>([]); //orders for customer
    const [pendingOrders, setPendingOrders] = useState<product[]>([]);
    const [orderHistory, setOrderHistory] = useState<product[]>([]);
    const [salesHistory, setSalesHistory] = useState<product[]>([]);

    const { user } = useAuth();
    const { open } = useModal()

    useEffect(() => {
        if (!user) return;

        const userDoc = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDoc, (snap) => {
            const data = snap.data();
            setCart(data?.cart || []);
            setOrders(data?.orders || []) //set orders
            setPendingOrders(data?.pendingOrders || [])
            setOrderHistory(data?.orderHistory || [])
            setSalesHistory(data?.salesHistory || [])
        });

        return () => unsubscribe();
    }, [user]);

    const isInCart = (productToCheck: product) => {
        return cart.some((item) => item.docID === productToCheck.docID);
    };

    const addToCart = async (productToAdd: product) => {
        if (!user) return;
        if (isInCart(productToAdd)) {
            open("Already in cart");
            return;
        }

        const userDoc = doc(db, "users", user.uid);
        productToAdd.buyerID = user.uid //adding buyer id
        productToAdd.boughtBy = user.username // adding buyer name
        await updateDoc(userDoc, {
            cart: [...cart, productToAdd],
        });
        open("Successfully added to cart");

    };
    const removeFromCart = async (productToRemove: product) => {
        if (!user) return;
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
            cart: cart.filter((item) => item.docID !== productToRemove.docID),
        });
        console.log(`Successfully removed ${productToRemove.docID}from cart`);

    };

    const addToOrders = async () => {
        if (!user) return;
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
            orders: [...orders, ...cart],
            cart: [],
        });
        console.log("orders taken, submitting requests to merchants")
        for (const product of cart) {
            const sellerDoc = doc(db, "users", product.sellerID as string);
            const sellerSnap = await getDoc(sellerDoc);
            const sellerData = sellerSnap.data();
            const prevPendingOrders = (sellerData?.pendingOrders || []);
            await updateDoc(sellerDoc, {
                pendingOrders: [...prevPendingOrders, product],
            })

        }
    };

    const fulfillOrder = async (product: product) => {
        if (!user) return;

        console.log("fulfillingggg order")
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
            pendingOrders: pendingOrders.filter((item) =>
                !(
                    item.docID === product.docID &&
                    item.buyerID === product.buyerID
                )
            ),
            salesHistory: [...salesHistory, product],

        });
        //removing merchant (here he's the user) order contingency
        const buyerDoc = doc(db, "users", product.buyerID as string);
        const buyerSnap = await getDoc(buyerDoc)
        const buyerData = buyerSnap.data()
        const buyerPrevOrders = (buyerData?.orders || []);
        const buyerOrderHistory = (buyerData?.orderHistory || []);
        const buyerNewOrders = buyerPrevOrders.filter((item: any) => !(
            item.docID === product.docID &&
            item.buyerID === product.buyerID
        ));
        await updateDoc(buyerDoc, {
            orders: buyerNewOrders, //removing order from customer
            orderHistory: [...buyerOrderHistory, product],
        })

    }

    // const addReview = async (product: product, newReview: reviews) => {
    //     if (!user) return;

    //     const productDoc = doc(db, "products", product.docID as string);
    //     const productSnap = await getDoc(productDoc);

    //     if (!productSnap.exists()) {
    //         console.error("Product not found");
    //         return;
    //     }

    //     const productData = productSnap.data();
    //     const existingReviews: reviews[] = productData.reviews || [];

    //     // Filter out any review from the same user
    //     const updatedReviews = existingReviews.filter(
    //         (review) => review.user_id !== user.uid
    //     );

    //     // Add the new/updated review
    //     updatedReviews.push(newReview);

    //     // Update the product document
    //     await updateDoc(productDoc, {
    //         reviews: updatedReviews,
    //     });

    //     console.log("Review added/updated successfully");
    // }

    return { cart, addToCart, removeFromCart, isInCart, addToOrders, orders, pendingOrders, fulfillOrder, orderHistory, salesHistory };
};
