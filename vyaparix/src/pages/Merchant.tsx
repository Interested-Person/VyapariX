import { useNavigate } from "react-router-dom";
import { useMerchant } from "../hooks/useMerchant"
// import ProductCard from "../Components/Modals/ProductCard";
import ProductCard2 from "../Components/Modals/ProductCard2";
import { useAuth } from "../hooks/useAuth";
const Merchant = () => {
    const { selfProducts } = useMerchant();
    const { user } = useAuth()
    const navigate = useNavigate()
    return (
        <div className="min-h-screen p-4 flex flex-col gap-2 md:gap-10 bg-teal-950">
            <h1 className="text-sm md:text-2xl text-white">Welcome {user?.username}<br />Your mechant id is {user?.uid}</h1>
            <h2 className="text-sm md:text-xl text-white">Your options</h2>
            <div className="flex gap-2 md:gap-10 text-xs md:text-sm ">
                <button className="bg-teal-400 p-1 md:p-4 rounded-md" onClick={() => navigate("/addproduct")}>Add new product</button>
                <button className="bg-teal-400 p-1 md:p-4 rounded-md" >Check revenue</button>
                <button className="bg-teal-400 p-1 md:p-4 rounded-md" >Check pending Orders</button>

            </div>
            <h2 className="text-xl text-white">Currently Listed Products</h2>
            <div className="flex flex-wrap">
                {selfProducts.map((p) => (
                    <div
                        className="flex-none basis-1/2 md:basis-1/3 xl:basis-1/4 my-4"
                        key={p.docID}
                    >
                        <ProductCard2
                            docID={p?.docID || ""}
                            product={p}
                            isMerchantPage={true}
                        />
                    </div>
                ))}
            </div>



        </div>

    )
}

export default Merchant