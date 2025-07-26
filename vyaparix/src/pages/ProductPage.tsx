import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path
import type { product } from "../types/types"; // your product type

const ProductPage = () => {
  const { productID } = useParams<{ productID: string }>();
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productID) return;
      const docRef = doc(db, "products", productID);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setProduct({ id: snapshot.id, ...snapshot.data() } as product);
      }
    };

    fetchProduct();
  }, [productID]);

  return (
    <div>
      <h1>Product Page</h1>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>
          {/* <p>Seller ID: {product.}</p> */}
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductPage;
