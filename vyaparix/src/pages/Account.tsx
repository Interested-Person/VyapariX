import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const Account = () => {
    const { user, isLoggedIn, logOut } = useAuth();
    const navigate = useNavigate();
    if (!isLoggedIn)
        navigate(-1);
    return (
        <div>
            <h1>Account Page</h1>
            <img src={user?.pfpUrl} referrerPolicy="no-referrer" loading="lazy" alt="" />
            {user?.username}
            {user?.isMerchant ? " is a Merchant" : " is A customer"}
            <br />
            {isLoggedIn && <button className="mx-2 bg-emerald-600 p-2  cursor-pointer hover:scale-105 rounded-md" onClick={() => logOut()}>Logout</button>}

        </div>
    )
}

export default Account