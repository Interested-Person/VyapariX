import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const Account = () => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    if (!isLoggedIn)
        navigate(-1);
    return (
        <div>
            <h1>Account Page</h1>
            <img src={user?.pfpUrl} referrerPolicy="no-referrer" loading="lazy" alt="" />
            {user?.username}
            {user?.isMerchant?" is a Merchant":" is A customer"}

        </div>
    )
}

export default Account