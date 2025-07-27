import ProductCard2 from "../Components/Modals/ProductCard2";
import { useCart } from "../hooks/useCart"

const Cart = () => {
    const { cart } = useCart();
    return (
        <div className="bg-teal-950 flex flex-col gap-4 w-screen min-h-screen">
            <h1 className="text-xl m-4 mx-auto text-white">Recently Added</h1>
            <div className="flex flex-wrap">
                {cart.map((p) => (
                    <div
                        className="flex-none basis-1/4 my-4"
                        key={p.docID}
                    >
                        <ProductCard2
                            docID={p?.docID || ""}
                            product={p}
                            isMerchantPage={false}
                        />
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Cart