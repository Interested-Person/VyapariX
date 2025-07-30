import { useCart } from "../hooks/useCart"
import ProductCard2 from "../Components/Modals/ProductCard2"
import { useState, useEffect } from "react"

const Revenue = () => {
    const { salesHistory } = useCart()
    const reversed = [...salesHistory].reverse();
    const [salesTotal, setSalesTotal] = useState(0);
    useEffect(() => {
        let total = 0;
        salesHistory.forEach((item) => {
            total += item.price;
        });
        setSalesTotal(total);
    }, [salesHistory])
    return (
        <div className="bg-teal-950 flex flex-col gap-4 w-screen min-h-screen">
            <h1 className="text-xl m-4 mx-auto text-white">Your sales: ₹{salesTotal}</h1>
            <div className="flex flex-wrap">
                {reversed.map((p) => (
                    <div
                        className="flex-none basis-1/2 md:basis-1/3 xl:basis-1/4 my-4"
                        key={p.docID}
                    >
                        <ProductCard2
                            docID={p?.docID || ""}
                            product={p}
                            whatPage="saleshistory"
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Revenue