import { useCart } from "../hooks/useCart"
import ProductCard2 from "../Components/Modals/ProductCard2";
const MerchantOrders = () => {
    const { pendingOrders } = useCart();


    return (
        <div>
            <div>
                <h1 className="text-xl m-4 mx-auto text-white">Merchant Pending Orders</h1>
            </div>
            {pendingOrders.length == 0 && <h1 className="text-xl m-4 mx-auto text-white">No pending orders</h1>}
            <div className="flex flex-wrap">
                {pendingOrders.map((p) => (
                    <div
                        className="flex-none basis-1/2 md:basis-1/3 xl:basis-1/4 my-4"
                        key={p.docID}
                    >
                        <ProductCard2
                            docID={p?.docID || ""}
                            product={p}
                            whatPage="merchantorders"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MerchantOrders