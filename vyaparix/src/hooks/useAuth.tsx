import { onAuthStateChanged,signOut} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import type { User } from "../types/types";

// Optional: expand User type to include isMerchant
// export interface User {
//   uid: string;
//   username: string;
//   pfpUrl: string;
//   isMerchant: boolean;
// }

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [needsMerchantInfo, setNeedsMerchantInfo] = useState(false);
    const [firebaseUser, setFirebaseUser] = useState<any>(null); // store user until info is collected

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
                const uid = fbUser.uid;
                const userRef = doc(db, "users", uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUser(userSnap.data() as User);
                    setLoggedIn(true);
                } else {
                    setFirebaseUser(fbUser); // temporarily hold user
                    setNeedsMerchantInfo(true); // trigger UI to ask
                }
            } else {
                setUser(null);
                setLoggedIn(false);
                setFirebaseUser(null);
                setNeedsMerchantInfo(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // You must call this manually after asking the user
    const completeRegistration = async (isMerchant: boolean) => {
        if (!firebaseUser) return;

        const newUser: User = {
            uid: firebaseUser.uid,
            username: firebaseUser.displayName || "",
            pfpUrl: firebaseUser.photoURL || "",
            isMerchant: isMerchant,
        };

        const userRef = doc(db, "users", firebaseUser.uid);
        await setDoc(userRef, newUser);
        setUser(newUser);
        setLoggedIn(true);
        setNeedsMerchantInfo(false);
    };
    const logOut=()=>{
        signOut(auth)
    }

    return { user, isLoggedIn, needsMerchantInfo, completeRegistration,logOut };
};
