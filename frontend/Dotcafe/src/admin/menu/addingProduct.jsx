import React, { useState, useEffect } from "react";
import "./window.css";
import trashIcon from '../icons/trash.svg';
import editIcon from '../icons/edit.svg';

export default function AddingProduct({ window, setWindow, data, setData, currentID, setCurrentID }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");

    useEffect(() => {
        if (currentID) {
            get_product();
        }
    }, [currentID]);

    function get_product() {
        data.forEach((item) => {
            if (item.id === currentID) {
                setCategory(item.category);
                setName(item.name);
                setPrice(item.price);
                setSize(item.size || "Small"); 
            }
        });
    }

    const handleSave = () => {
        const updatedProduct = {
            id: currentID,
            name: name,
            category: category,
            availability: "In Stock",
            price: price,
          
        };

        const updatedData = data.map((item) =>
            item.id === currentID ? updatedProduct : item
        );

        setData(updatedData);
        setWindow("Home");
    };

    const handleCancel = () => {
        setWindow("Home");
    };

    return (
        <div className="background">
            <div className="window">
                <h3>{window === "New Product" ? "Adding Product" : "Editing Product"}</h3>
                <form>
                    <div className="row">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Type Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Choose Category</option>
                            <option value="Coffee Beans">Coffee Beans</option>
                            <option value="Tea Leaves">Tea Leaves</option>
                        </select>
                    </div>

                    <div className="row">
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            placeholder="Type Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <label>Description</label>
                        <textarea placeholder="Type Description"></textarea>
                    </div>

                    <div className="row">
                        <label>Size</label>
                        <div className="size-options">
                            <input
                                type="radio"
                                id="small"
                                name="size"
                                value="Small"
                                checked={size === "Small"}
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <label htmlFor="small" className="size-button">Small</label>

                            <input
                                type="radio"
                                id="medium"
                                name="size"
                                value="Medium"
                                checked={size === "Medium"}
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <label htmlFor="medium" className="size-button">Medium</label>

                            <input
                                type="radio"
                                id="large"
                                name="size"
                                value="Large"
                                checked={size === "Large"}
                                onChange={(e) => setSize(e.target.value)}
                            />
                            <label htmlFor="large" className="size-button">Large</label>
                        </div>
                    </div>

                    <div className="image-upload">
                        <label>Image</label>
                        <div className="image-preview">image</div>
                        <div className="image-buttons">
                            <button>
                                <img style={{ width: "32px", height: "32px" }} src={trashIcon} alt="trash icon" title="Delete Image" />
                            </button>
                            <button>
                                <img style={{ width: "32px", height: "32px" }} src={editIcon} alt="edit icon" title="Edit Image" />
                            </button>
                        </div>
                    </div>
                </form>

                <div className="actions">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
