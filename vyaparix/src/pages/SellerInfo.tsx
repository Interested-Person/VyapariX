import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path as needed
import type { User } from "../types/types"; // assuming you have a User type

const SellerInfo = () => {
  const { sellerID } = useParams<{ sellerID: string }>();
  const [seller, setSeller] = useState<User | null>(null);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!sellerID) return;
      const docRef = doc(db, "users", sellerID);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setSeller({ ...snapshot.data() } as User);
      }
    };

    fetchSeller();
  }, [sellerID]);

  return (
    <div>
      <h1>Seller Info</h1>
      {seller ? (
        <div>
          <p>Name: {seller.username}</p>
          {/* <p>Email: {seller.email}</p> */}
          {/* add more fields as needed */}
        </div>
      ) : (
        <p>Loading seller data...</p>
      )}
    </div>
  );
};

export default SellerInfo;
