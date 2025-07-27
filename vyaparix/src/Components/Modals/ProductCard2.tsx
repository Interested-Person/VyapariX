import type { product } from "../../types/types";
import placeholderimage from '../../assets/placeholderimage.jpg';
import { useMerchant } from "../../hooks/useMerchant";
let c = 0;

const ProductCard2 = ({ product, isMerchantPage, docID }: { product: product, isMerchantPage: boolean, docID: string }) => {
    const { deleteProduct } = useMerchant();
    return (
        <a

            className=" group relative block w-full max-w-xs mx-auto overflow-hidden rounded-md shadow-sm"

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

            <div className="relative border border-gray-100 bg-white p-6">

                {product?.tag?.map((t) => {

                    return (
                        <span key={c++} className="bg-emerald-50 text-emerald-600 px-3 py-1.5 text-xs font-medium whitespace-nowrap mr-2"> {t} </span>
                    )
                })}

                <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>

                <p className="mt-1.5 text-sm text-gray-700">₹{product.price}</p>

                <form className="mt-4">

                    {isMerchantPage && <button
                        className="block w-full rounded-sm bg-emerald-500 p-4 text-sm font-medium transition hover:scale-105"
                        onClick={(e) => { e.preventDefault(); deleteProduct(docID); }}
                    >Remove </button>}
                    {!isMerchantPage && <button
                        className="block w-full rounded-sm bg-emerald-500 p-4 text-sm font-medium transition hover:scale-105"
                        onClick={(e) => { e.preventDefault(); }}
                    >Add to Cart</button>}

                </form>
            </div>
        </a>
    );
}

export default ProductCard2