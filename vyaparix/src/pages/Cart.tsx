import ProductCard2 from "../Components/Modals/ProductCard2";
import { useCart } from "../hooks/useCart"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Cart = () => {
    const { cart, addToOrders } = useCart();
    const [cartTotal, setCartTotal] = useState(0);
    useEffect(() => {
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });
        setCartTotal(total);
    }, [cart])

    const navigate = useNavigate();
    return (

        <div className="bg-teal-950 flex flex-col gap-4 w-screen min-h-screen">
            <h1 className="text-xl m-4 mx-auto text-white">Your Cart</h1>
            {cart.length == 0 && <h1 className="text-xl m-4 mx-auto text-white">Your cart is empty</h1>}
            <div className="flex flex-wrap">
                {cart.map((p) => (
                    <div
                        className="flex-none basis-1/2 md:basis-1/3 xl:basis-1/4 my-4"
                        key={p.docID}
                    >
                        <ProductCard2
                            docID={p?.docID || ""}
                            product={p}
                            whatPage="cart"
                        />
                    </div>
                ))}

            </div>
            <div>
                <h1 className="ml-10 text-xl m-4 mx-auto text-white">Cart Total: ₹{cartTotal}</h1>
            </div>
            <div>
                <button
                    onClick={() => addToOrders()}
                    className="mx-7 mt-4 text-xl  bg-teal-600 hover:bg-teal-500 text-white font-light py-2 px-6 rounded-full transition-transform hover:scale-105"
                >
                    Place Order
                </button>
                <button
                    onClick={() => navigate("/orders")}
                    className="mx-7 mt-4 text-xl  bg-teal-600 hover:bg-teal-500 text-white font-light py-2 px-6 rounded-full transition-transform hover:scale-105"
                >
                    Check Orders
                </button>
                <button
                    onClick={() => navigate("/orderhistory")}
                    className="mx-7 mt-4 text-xl  bg-teal-600 hover:bg-teal-500 text-white font-light py-2 px-6 rounded-full transition-transform hover:scale-105"
                >
                    Order History
                </button>
            </div>


        </div>
    )
}

export default Cart