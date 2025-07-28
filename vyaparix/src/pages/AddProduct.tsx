import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMerchant } from "../hooks/useMerchant";
import { useNavigate } from "react-router-dom";
import type { product } from "../types/types";

const AddProduct = () => {
    const { user } = useAuth();
    const { addProduct } = useMerchant();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string>("");
    const [tags_str, settags_str] = useState("");

    if (!user?.isMerchant)
        return (
            <p className="text-center text-red-400 mt-10">
                Only merchants can add products.
            </p>
        );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = tags_str.trim().split(" ");

        if (!name || !price || !description || !image || !tags_str) {
            alert("All fields are required.");
            return;
        }

        const product: product = {
            name,
            price: Number(price),
            description,
            sellerID: user.uid,
            createdAt: new Date(),
            id: "xyz",
            image_address: image,
            reviews: [],
            tag: tagsArray
        };

        try {
            await addProduct(product);
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            settags_str("");
            navigate("/merchant");
        } catch (err) {
            console.error("Failed to add product:", err);
            alert("Failed to add product.");
        }
    };

    return (
        <div className="bg-teal-950 w-screen pt-12  min-h-screen m-0">
            <div className="max-w-lg  mx-auto  p-6 bg-gray-900 text-white rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-teal-400 text-center">
                    Add a New Product
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Image URL</label>
                        <textarea
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Tags (space-separated)
                        </label>
                        <textarea
                            value={tags_str}
                            onChange={(e) => settags_str(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded transition duration-200"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
