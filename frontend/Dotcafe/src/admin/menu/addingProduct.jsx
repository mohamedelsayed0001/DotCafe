import React, { useState, useEffect } from "react";
import "../window.css";
import editIcon from '../icons/edit.svg';

export default function AddingProduct({ menuWindow, setMenuWindow, categories, setCategories, selectedProduct, setSelectedProduct }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    const [inStock, setInStock] = useState(null)

    useEffect(() => { 
        if (menuWindow === "Edit Product" && selectedProduct) { 
            setName(selectedProduct.name || ""); 
            setCategoryId(selectedProduct.categoryId || ""); 
            setInStock(selectedProduct.inStock === true ? true : false); 
            setPrice(selectedProduct.price || ""); 
            setDescription(selectedProduct.description || ""); 
            setImageSrc(selectedProduct.src || ""); 
        } 
    }, [menuWindow, selectedProduct]);

    const addProduct = async (product) => {

        try {
            const response = await fetch('http://localhost:8080/admin/product', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(product)
            }
        ); 

        if (!response.ok) { 
            const errorText = await response.text();
            alert(errorText)
            return; 
        }
        const data = await response.json(); 

        const returnedProduct = { 
            id: data.id,
            name: data.name,
            description: data.description || '',
            categoryId: data.categoryId || 0,
            inStock: data.inStock,
            price: data.price,
            src: data.src
        };
        

        setCategories(prevCategories =>
            prevCategories.map(category => 
                category.id === returnedProduct.categoryId ? 
                { ...category, products: [...category.products, returnedProduct] } 
                : category 
            ) 
        );

        } catch (error) {
          console.error('Error adding product:', error); 
        } 
    };

    const editProduct = async (product) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/product/edit/${product.id}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(product)
            }
        ); 

        if (!response.ok) {
            const errorText = await response.text();
            alert(errorText)
            return;
        }
        const data = await response.json(); 

        const returnedProduct = { 
            id: data.id,
            name: data.name,
            description: data.description || '',
            categoryId: data.categoryId || 0,
            inStock: data.inStock,
            price: data.price,
            src: data.src
        };

        if(selectedProduct.categoryId === returnedProduct.categoryId) {
            setCategories(prevCategories => 
                prevCategories.map(category => category.products ?
                    { ...category, products: category.products.map(product => 
                                product.id === returnedProduct.id ? 
                                    { ...product, ...returnedProduct }
                                : product
                            )
                        }
                    : category
                )
            );
        } else {
            setCategories(prevCategories => {
                return prevCategories.map(category => {
                    if (category.id === selectedProduct.categoryId) {
                        return {
                            ...category,
                            products: category.products.filter(p => p.id !== selectedProduct.id),
                        };
                    }
                    return category;
                });
            });

            setCategories(prevCategories => {
                return prevCategories.map(category => {
                    if (category.id === returnedProduct.categoryId) {
                        return {
                            ...category,
                            products: [...category.products, returnedProduct],
                        };
                    }
                    return category;
                });
            });
        
        }
        } catch (error) {
          console.error('Error editing product:', error); 
        } 
    };

    const handleSave = async () => {
        if(name === "") {
            alert("write product name");
            return;
        } else if (categoryId === "" || categoryId === null) {
            alert("choose a category");
            return;
        } else if (inStock === "" || inStock === null) {
            alert("Choose an availability");
            return;
        } else if (price === null) {
            alert("set product price");
            return;
        } else if (description === "") {
            alert("write product description");
            return;
        } else if (imageSrc === "") {
            alert("import product image");
            return;
        }

        const newProduct = { 
            id: selectedProduct && !isNaN(Number(selectedProduct.id)) ? Number(selectedProduct.id) : 0,
            name, 
            description, 
            categoryId: Number(categoryId), 
            inStock, 
            price: Number(price), 
            src: imageSrc 
        };

        if (menuWindow === "Edit Product") {
            await editProduct(newProduct)
        } else if (menuWindow === "New Product") {
            await addProduct(newProduct);
        }

        setSelectedProduct(null)
        setMenuWindow("Home");
    };    

    const handleCancel = () => {
        setSelectedProduct(null)
        setMenuWindow("Home");
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(String(reader.result));
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image file.");
        }
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
                        <label>Availability</label>
                        <select value={inStock} onChange={(e) => setInStock(e.target.value)}>
                            <option value="">Choose Availability</option>
                            <option value={false}>Out of Stock</option>
                            <option value={true}>In Stock</option>
                            
                        </select>
                    </div>

                    <div className="row">
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            placeholder="Type Price"
                            onChange={(e) => setPrice(e.target.value)}
                            min={0}
                        />
                    </div>

                    <div className="row">
                        <label>Description</label>
                        <textarea 
                            placeholder="Type Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={220}
                        ></textarea>
                    </div>

                    <div className="image-upload" >
                        <label>Image</label>
                        <div className="file-upload" style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "20%"}}>
                            <input
                                id="file-input"
                                className="image-preview"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                />
                                { imageSrc && (
                                    <div className="image-container">
                                        <img src={imageSrc} alt="Preview" className="image-preview" />
                                    </div>
                                )}
                                {true && (
                                    <label htmlFor="file-input" className="custom-file-label">
                                        <img style={{ width: "32px", height: "32px" }} src={editIcon} alt="edit icon" title="Edit Image" />
                                    </label>
                                )}
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
