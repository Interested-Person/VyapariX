import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Navbar = () => {
    const {user,logOut,isLoggedIn} = useAuth();
    const navigate =useNavigate()
    return (<>
        <nav className="bg-emerald-800 h-16 flex items-center justify-between text-white px-3">
            <img src={Logo} className="h-20 " alt="" />
            <input type="text" className="rounded-md bg-white h-12 w-96 text-gray-700 outline-0 p-2" placeholder="What's on your mind today?"/>
            <div className="flex items-center justify-between">
                <span className="mx-2 bg-emerald-600 p-2 cursor-pointer hover:scale-105 rounded-md" onClick={()=>navigate("/")}>Home</span>
                <span className="mx-2 bg-emerald-600 p-2 cursor-pointer hover:scale-105 rounded-md" onClick={()=>navigate("/login")}>Sign in</span>
                {isLoggedIn&&<div className="mx-2 ">{user?.username}</div>}
                {isLoggedIn &&<img className="rounded-full  mx-2 w-12 h-12 " referrerPolicy="no-referrer" loading="lazy" src={user?.pfpUrl}/>}
                <span className="mx-2 bg-emerald-600 p-2 cursor-pointer hover:scale-105 rounded-md" onClick={()=>logOut()}>Logout</span>

                <ShoppingCartIcon className="text-emerald-400 h-10"/>
            </div>
        </nav>
        <nav className="bg-emerald-700 w-full h-8"></nav>
        </>
    )
}

export default Navbar;