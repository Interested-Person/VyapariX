import ProductCard2 from "../Components/Modals/ProductCard2"
import { useCart } from "../hooks/useCart"

const Orders = () => {
    const { orders } = useCart();
    return (
        <div className="bg-teal-950 flex flex-col gap-4 w-screen min-h-screen">
            <h1 className="text-xl m-4 mx-auto text-white">Your Orders</h1>
            <div className="flex flex-wrap">
                {orders.length == 0 && <h1 className="text-xl m-4 mx-auto text-white">No Orders</h1>}
                {orders.map((p) => (
                    <div
                        className="flex-none basis-1/2 md:basis-1/3 xl:basis-1/4 my-4"
                        key={p.docID}
                    >
                        <ProductCard2
                            docID={p?.docID || ""}
                            product={p}
                            whatPage="orders"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders