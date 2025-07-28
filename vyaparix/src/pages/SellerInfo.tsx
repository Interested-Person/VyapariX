import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path as needed
import type { User } from "../types/types"; // assuming you have a User type
import type { product } from "../types/types";
import ProductCard2 from "../Components/Modals/ProductCard2";

const SellerInfo = () => {
  const { sellerID } = useParams<{ sellerID: string }>();
  const [seller, setSeller] = useState<User | null>(null);
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!sellerID) return;
      const docRef = doc(db, "users", sellerID);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setSeller({ ...snapshot.data() } as User);
      }
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("sellerID", "==", sellerID));
      const productsSnapshot = await getDocs(q);
      setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as product[]);

    };

    fetchSeller();
  }, [sellerID]);

  return (
    <div>
      <h1 className="text-xl m-4 mx-auto text-white">Seller Info</h1>
      {seller ? (
        <div>

          <h1 className="text-xl m-4 mx-auto text-white">Name: {seller.username}</h1>
          <div className="flex flex-wrap">
            {products.map((p) => (
              <div
                className="flex-none basis-1/2 md:basis-1/3 xl:basis-1/4 my-4"
                key={p.docID}
              >
                <ProductCard2
                  docID={p?.docID || ""}
                  product={p}
                  whatPage="home"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading seller data...</p>
      )}
    </div>
  );
};

export default SellerInfo;
