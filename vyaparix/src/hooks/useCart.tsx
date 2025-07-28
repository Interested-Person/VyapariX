import {
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import type { product } from "../types/types";
import { useAuth } from "./useAuth";
import { useModal } from "./useModal";

export const useCart = () => {
    const [cart, setCart] = useState<product[]>([]);
    const [orders, setOrders] = useState<product[]>([]); //orders for customer
    const [pendingOrders, setPendingOrders] = useState<product[]>([]);

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

    return { cart, addToCart, removeFromCart, isInCart, addToOrders, orders, pendingOrders };
};
