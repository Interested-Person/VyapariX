import { useNavigate } from "react-router-dom";
import { useMerchant } from "../hooks/useMerchant"
import ProductCard from "../Components/Modals/ProductCard";

const Merchant = () => {
    const { selfProducts } = useMerchant();
    const navigate = useNavigate()
    return (
        <div>
            <h1>Merchant</h1>
            <button className="bg-emerald-400 p-4 rounded-md" onClick={() => navigate("/addproduct")}>Add new product</button>
            <div className="flex justify-center items-center flex-col">
                <h1 className="mx-auto">Your products</h1>
                {selfProducts.map((p) => {
                    return (
                        <div key={p.id}>
                            <ProductCard product={p} />

                        </div>
                    )
                })}
            </div>

        </div>

    )
}

export default Merchant