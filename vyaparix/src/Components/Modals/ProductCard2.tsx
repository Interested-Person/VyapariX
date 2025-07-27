import type { product } from "../../types/types";
import placeholderimage from '../../assets/placeholderimage.jpg';
import { useMerchant } from "../../hooks/useMerchant";
import { useNavigate } from "react-router-dom";

let c = 0;


const ProductCard2 = ({ product, isMerchantPage, docID }: { product: product, isMerchantPage: boolean, docID: string }) => {
    const { deleteProduct } = useMerchant(); //deletes product
    const navigate = useNavigate()
    const navigateToProductPage = () => {
        navigate(`/productpage/${docID}`)
    }
    return (
        <a

            className=" bg-teal-600 group relative block w-full max-w-xs mx-auto overflow-hidden rounded-md shadow-sm"
            onClick={navigateToProductPage}
        >


            <img
                src={product.image_address || placeholderimage}
                onError={
                    (e) => {
                        e.preventDefault();
                        e.currentTarget.src = placeholderimage;
                    }
                }
                alt={product.description}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border bg-teal-600 border-teal-400   p-6">

                <div className="flex overflow-x-scroll hide-scrollbar">
                    {product?.tag?.map((t) => {

                        return (
                            <span key={c++} className="bg-teal-50 text-teal-600 px-3 py-1.5 text-xs font-medium whitespace-nowrap mr-2"> {t} </span>
                        )
                    })}
                </div>

                <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>

                <p className="mt-1.5 text-sm text-gray-700">₹{product.price}</p>

                <form className="mt-4">

                    {isMerchantPage && <button
                        className="block w-full rounded-sm bg-teal-500 p-4 text-sm font-medium transition hover:scale-105"
                        onClick={(e) => { e.preventDefault(); deleteProduct(docID); }}
                    >Remove </button>}
                    {!isMerchantPage && <button
                        className="block w-full rounded-sm bg-teal-500 p-4 text-sm font-medium transition hover:scale-105"
                        onClick={(e) => { e.preventDefault(); navigateToProductPage() }} //replace navigateToProductPage() with addtoCart()
                    >Add to Cart</button>}

                </form>
            </div>
        </a>
    );
}

export default ProductCard2