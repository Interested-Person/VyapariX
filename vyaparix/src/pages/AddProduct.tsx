import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMerchant } from "../hooks/useMerchant";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const { user } = useAuth();
    const { addProduct } = useMerchant();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string>("");

    if (!user?.isMerchant) return <p>Only merchants can add products.</p>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !description || !image) {
            alert("All fields are required.");
            return;
        }

        const product = {
            name,
            price: Number(price),
            description,
            sellerID: user.uid,
            createdAt: new Date(),
            id: "xyz",
            image_address: image,
            reviews: [],
        };

        try {
            await addProduct(product);
            alert("Product added!");
            setName("");
            setPrice("");
            setDescription("");
            setImage("");
            navigate("/merchant")
        } catch (err) {
            console.error("Failed to add product:", err);
            alert("Failed to add product.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto" }}>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <textarea
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <button type="submit" style={{ marginTop: 10 }}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
