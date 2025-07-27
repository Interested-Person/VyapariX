import ProductCard2 from "../Components/Modals/ProductCard2"
import { useProducts } from "../hooks/useProducts"

const Home = () => {
    const { products } = useProducts()
    return (
        <div className="bg-teal-950 flex flex-col gap-4 w-screen min-h-screen">
            <h1 className="text-xl m-4 mx-auto text-white">Recently Added</h1>
            <div className="flex flex-wrap">
                {products.map((p) => (
                    <div
                        className="flex-none basis-1/4 my-4"
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

export default Home