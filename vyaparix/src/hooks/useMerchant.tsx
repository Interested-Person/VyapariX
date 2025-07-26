import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import type { product } from "../types/types";
import { useAuth } from "./useAuth";

export const useMerchant = () => {
  const {user} = useAuth();
  const [selfProducts, setSelfProducts] = useState<product[]>([]);

  useEffect(() => {
    if (!user) return;

    const collectionRef = collection(db, "products");
    const q = query(collectionRef, where("sellerID", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const products: product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as product[];
      setSelfProducts(products);
    });

    return () => unsubscribe();
  }, [user]);

  const addProduct = async (newProduct: Omit<product, "id" | "sellerID">) => {
    if (!user) return;

    const collectionRef = collection(db, "products");

    await addDoc(collectionRef, {
      ...newProduct,
      sellerID: user.uid,
      createdAt: serverTimestamp(),
    });
  };

  return { selfProducts, addProduct };
};
