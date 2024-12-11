import React, { useState, useEffect } from "react";
import "./window.css";
import trashIcon from '../icons/trash.svg';
import editIcon from '../icons/edit.svg';

export default function AddingProduct({ menuWindow, setMenuWindow, categories, setCategories, currentID, setCurrentID }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {

        if (currentID && menuWindow === "Edit Product") {
            get_product();
        }
    }, [currentID]);

    function get_product() {
        data.forEach((item) => {
            if (item.id === currentID) {
                setCategoryId(item.category);
                setName(item.name);
                setPrice(item.price);
            }
        });
    }

    const handleSave = async () => {
        if (menuWindow === "Edit Product") {
            const updatedProduct = {
                id: currentID,
                name: name,
                category: categoryId,
                availability: "In Stock",
                price: price,
            };

            setCategories(prevCategories => 
                prevCategories.map(category => 
                    category.products 
                        ? { 
                            ...category, 
                            products: category.products.map(product => 
                                product.id === currentID 
                                    ? { ...product, ...updatedProduct }
                                    : product
                            )
                        }
                        : category
                )
            );
            // const updatedData = data.map((item) =>
            //     item.id === currentID ? updatedProduct : item
            // );
    
            // setData(updatedData);
            setMenuWindow("Home");
        } else if (menuWindow === "New Product") {
            const newProduct = {
                id: 9340, 
                name: name,
                category: categoryId,
                inStock: true,
                price: price,
            };
            categories[categoryId].products.push(newProduct);
            setCategories(categories);

            console.log(categories);
            
        
            //  data.push(newProduct);
            //  setData(data);
             setMenuWindow("Home");
            /*try {
                const response = await axios.post("localhost:8080/add_product", newProduct);
                const createdProduct = { ...newProduct, id: response.data.id };
    
                setData([...data, createdProduct]); 
                setWindow("Home");
            } catch (error) {
                console.error("Error creating product:", error.response);
            }
        }*/}
    };
    

    const handleCancel = () => {
        setMenuWindow("Home");
    };

    return (
        <div className="background">
            <div className="window">
                <h3>{menuWindow === "New Product" ? "Adding Product" : "Editing Product"}</h3>
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
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
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
