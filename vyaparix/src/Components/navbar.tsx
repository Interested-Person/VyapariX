import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg"
const Navbar = () => {
    return (<>
        <nav className="bg-emerald-800 h-16 flex items-center justify-between text-white px-3">
            <img src={Logo} className="h-20 " alt="" />
            <input type="text" className="rounded-md bg-white h-12 w-96 text-gray-700 outline-0 p-2" placeholder="What's on your mind today?"/>
            <div className="flex items-center justify-between">

                <span className="mx-2 ">Sign in</span>
                <div className="mx-2 ">Orders</div>
                <div className="rounded-full bg-red-500 mx-2 w-12 h-12 "></div>

                <ShoppingCartIcon className="text-emerald-400 h-10"/>
            </div>
        </nav>
        <nav className="bg-emerald-700 w-full h-8"></nav>
        </>
    )
}

export default Navbar;