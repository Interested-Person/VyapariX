import ProductCard2 from "../Components/Modals/ProductCard2";
import { useCart } from "../hooks/useCart";

const OrderHistory = () => {
    const { orderHistory } = useCart();
    return (
        <div>
            <h1 className="text-xl m-4 mx-auto text-white">Order History</h1>
            {orderHistory.length == 0 && <h1 className="text-xl m-4 mx-auto text-white">Your cart is empty</h1>}
            <div className="flex flex-wrap">
                {orderHistory.map((p) => (
                    <div
                        className="flex-none basis-1/2 md:basis-1/3 xl:basis-1/4 my-4"
                        key={p.docID}
                    >
                        <ProductCard2
                            docID={p?.docID || ""}
                            product={p}
                            whatPage="orderhistory"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory