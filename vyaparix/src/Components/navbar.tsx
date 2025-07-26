import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Navbar = () => {
    const { user, logOut, isLoggedIn } = useAuth();
    const navigate = useNavigate()
    return (<>
        <nav className="select-none bg-emerald-800 h-16 flex items-center justify-between text-white px-3">
            <span className="flex items-center gap-2 text-emerald-200"><img src={Logo} className="h-20 " alt="" /> <span> {user?.isMerchant?"for Merchants":""}</span></span>
            <input type="text" className="rounded-md bg-white h-12 w-96 text-gray-700 outline-0 p-2" placeholder="What's on your mind today?" />
            <div className="flex items-center justify-between">
                <span className="mx-2 bg-emerald-600 p-2 cursor-pointer hover:scale-105 rounded-md" onClick={() => navigate("/")}>Home</span>
                {!isLoggedIn && <span className="mx-2 bg-emerald-600 p-2 cursor-pointer hover:scale-105  rounded-md" onClick={() => navigate("/login")}>Sign in</span>}
                {user?.isMerchant && <span className="mx-2 bg-emerald-600 p-2 cursor-pointer hover:scale-105  rounded-md" onClick={() => navigate("/merchant")}>Merchant Portal</span>}

                {isLoggedIn && <div className="mx-2 ">{user?.username}</div>}
                {isLoggedIn && <img className="rounded-full  mx-2 w-12 h-12 cursor-pointer hover:scale-105 hover:outline-1" referrerPolicy="no-referrer" loading="lazy" src={user?.pfpUrl} onClick={() => navigate('account')} />}
                {isLoggedIn && <span className="mx-2 bg-emerald-600 p-2 cursor-pointer hover:scale-105 rounded-md" onClick={() => logOut()}>Logout</span>}

                <ShoppingCartIcon className="text-emerald-400 h-10 cursor-pointer hover:scale-105" onClick={() => navigate("/cart")} />
            </div>
        </nav>
        <nav className="bg-emerald-700 w-full h-8"></nav>
    </>
    )
}

export default Navbar;