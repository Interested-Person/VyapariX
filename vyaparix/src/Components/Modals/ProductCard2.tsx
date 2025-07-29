import type { product, reviews } from "../../types/types";
import placeholderimage from '../../assets/placeholderimage.jpg';
import { useMerchant } from "../../hooks/useMerchant";

import { useCart } from "../../hooks/useCart";

import { useNavigate } from "react-router-dom";
import Review from "./Review";
import ReviewStar from "./ReviewStar";
import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useAuth } from "../../hooks/useAuth";


let c = 0;


const ProductCard2 = ({ product, whatPage, docID }: { product: product, whatPage: string, docID: string }) => {
    const { user } = useAuth();
    const { deleteProduct } = useMerchant();
    const { addToCart, removeFromCart, fulfillOrder } = useCart();
    const { addReview, products } = useProducts();
    const navigate = useNavigate()
    const navigateToProductPage = () => {
        navigate(`/productpage/${docID}`)
    }

    const [rating, setRating] = useState(0) //number to be displayed on product
    const [comment, setComment] = useState<string | undefined>("")
    const [inputRating, setInputRating] = useState(0) //number to be sent to db
    const rate: reviews = {
        user_id: user?.uid || "",
        user_name: user?.username || "",
        rating: inputRating,
        comment: comment
    }

    //  INSERT CODE TO CALCULATE AVERAGE RATING and store in rating
    useEffect(() => {
        let sum = 0;
        let len = -1;

        const currentProduct = products.find((p) => p.docID === docID);

        if (currentProduct && currentProduct.reviews) {
            currentProduct.reviews.forEach((r) => {
                sum += r.rating;
            });
            len = currentProduct.reviews.length;
        }

        let avgRating = 0;
        if (len > 0) {
            avgRating = sum / len;
        }

        setRating(Number(avgRating.toFixed(1)));
    }, [products, docID]);




    return (
        <a

            className=" bg-teal-600 group relative block w-40 md:w-64  xl:w-full max-w-xs mx-auto overflow-hidden rounded-md shadow-sm"

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
                className="h-40 w-full  md:h-64  object-cover transition duration-500 group-hover:scale-105 "
                onClick={() => { navigateToProductPage() }}
            />

            <div className="relative border bg-teal-600 border-teal-400   p-1 md:p-6">

                <div className="flex overflow-x-scroll hide-scrollbar" >
                    {product?.tag?.map((t) => {

                        return (
                            <span key={c++} className="bg-teal-50 text-teal-600 px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium whitespace-nowrap mr-2"> {t} </span>
                        )
                    })}
                </div>

                <h3 className="mt-4 text-sm md:text-lg font-medium text-gray-900" onClick={() => { navigateToProductPage() }}>{product.name} </h3>
                <Review size={"small"} rating={rating} />

                <p className="mt-1.5 text-xs md:text-sm text-gray-700" onClick={() => { navigateToProductPage() }}> ₹{product.price}{product.soldBy ? `, offered by ${product.soldBy}` : null} </p>

                <div className="mt-4">

                    {(whatPage === "merchant") && <button
                        className="block w-full rounded-sm bg-teal-500  p-1 md:p-4 text-xs md:text-sm font-medium transition hover:scale-105"
                        onClick={(e) => { e.preventDefault(); deleteProduct(docID); }}
                    >Remove </button>}
                    {(whatPage === "home") && <button
                        className="block w-full rounded-sm bg-teal-500 p-1 md:p-4 text-sm font-medium transition hover:scale-105"

                        onClick={(e) => { e.preventDefault(); addToCart(product) }}

                    >Add to Cart</button>}
                    {(whatPage === "cart") && <button
                        className="block w-full rounded-sm bg-teal-500 p-1 md:p-4 text-sm font-medium transition hover:scale-105"

                        onClick={(e) => { e.preventDefault(); removeFromCart(product) }}

                    >Remove from cart</button>}
                    {(whatPage === "merchantorders") && <button
                        className="block w-full rounded-sm bg-teal-500 p-1 md:p-4 text-sm font-medium transition hover:scale-105"

                        onClick={(e) => { e.preventDefault(); fulfillOrder(product) }}

                    >Fulfill order from {product.boughtBy}</button>}
                    {(whatPage === "orders") && null}
                    {(whatPage === "orderhistory") && <div>
                        <h1 className="underline">Leave a review</h1>
                        <form action="">
                            <input type="text" placeholder="Great Product!" onChange={(e) => { setComment(e.target.value) }} />
                            <br />
                            {/* <div className="flex space-x-1 mt-2">
                                <ReviewStar isFull={false} />  <ReviewStar isFull={false} /> <ReviewStar isFull={false} /><ReviewStar isFull={false} /><ReviewStar isFull={false} />
                            </div> */}
                            <div className="flex space-x-1 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setInputRating(star)}
                                        className="focus:outline-none"
                                    >
                                        <ReviewStar isFull={star <= inputRating} />
                                    </button>
                                ))}
                            </div>

                            <button onClick={(e) => { e.preventDefault(); addReview(product, rate) }}>Submit</button>
                        </form>
                    </div>}
                </div>
            </div>
        </a>
    );
}

export default ProductCard2