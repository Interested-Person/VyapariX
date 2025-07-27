import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "../../firebase";
import type { product } from "../types/types";

export const useProducts = () => {
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    const productsRef = collection(db, "products");

    // Query to get last 30 added products ordered by timestamp
    const q = query(
      productsRef,
      orderBy("createdAt", "desc"),
      limit(30)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: product[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as product),
        docID: doc.id
      }));
      setProducts(items);
    });

    return () => unsubscribe();
  }, []);

  return { products };
};
