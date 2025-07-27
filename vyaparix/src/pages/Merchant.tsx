import { useNavigate } from "react-router-dom";
import { useMerchant } from "../hooks/useMerchant"
// import ProductCard from "../Components/Modals/ProductCard";
import ProductCard2 from "../Components/Modals/ProductCard2";
const Merchant = () => {
    const { selfProducts } = useMerchant();
    const navigate = useNavigate()
    return (
        <div>
            <h1>Merchant</h1>
            <button className="bg-emerald-400 p-4 rounded-md" onClick={() => navigate("/addproduct")}>Add new product</button>
            {/* <div className="flex justify-center items-center flex-col"> */}
            <br />
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">

                {selfProducts.map((p) => {
                    return (
                        <div key={p.docID}>
                            {/* <ProductCard product={p} /> */}
                            <ProductCard2 docID={p?.docID ? p.docID : ""} product={p} isMerchantPage={true} />

                        </div>
                    )
                })}

            </div>

        </div>

    )
}

export default Merchant