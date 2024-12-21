import React, { useState, useEffect } from "react";
import upDownArrowIcon from '../icons/up-down-arrow.svg'
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'
import '../table.css'

export default function Table({window, setWindow, selectedProduct, setSelectedProduct, categories, setCategories}) {

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/product/${productId}`, {
                method: 'DELETE'
            });   
            const data = await response.text(); 
            console.log('delete message:', data);
        } catch (error) {
            console.error('Error deleting product:', error); 
        } 
    };

    const handleDelete = async (productId, categoryId) => { 
        await deleteProduct(productId); 
        setCategories(categories.map(category => 
            category.id === categoryId
                ? { ...category, products: category.products.filter(product => product.id !== productId) } :
                category ));
    };
    
    return (
        <div style={{ backgroundColor: "#E9EED9", padding: "0.5% 4% 0px 4%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {/* <th className="header-cell">Item ID</th> */}
                        <th className="header-cell">Product Name</th>
                        <th className="header-cell">Category</th>
                        <th className="header-cell">Availability</th>
                        <th className="header-cell">Item Price</th>
                        <th className="header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        category.products.length > 0 ? (
                        category.products.map((product) => (
                            <tr key={product.id}>
                            {/* <td className="table-cell">{product.id}</td> */}
                            <td className="table-cell">{product.name}</td>
                            <td className="table-cell">{category.name}</td> 
                            <td className="table-cell">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                            <td className="table-cell">${product.price}</td>
                            <td className="table-cell">
                                <button
                                className="actions-button"
                                onClick={() => {
                                    setSelectedProduct(product); 
                                    handleDelete(product.id, product.categoryId);
                                }}
                                >
                                <img
                                    style={{ width: "25px", height: "25px" }}
                                    src={trashIcon}
                                    alt="trash icon"
                                    title="Delete"
                                />
                                </button>
                                <button
                                className="actions-button"
                                onClick={() => {
                                    setWindow("Edit Product");
                                    setSelectedProduct(product);
                                }}
                                >
                                <img
                                    style={{ width: "25px", height: "25px" }}
                                    src={editIcon}
                                    alt="edit icon"
                                    title="Edit"
                                />
                                </button>
                            </td>
                            </tr>
                        ))
                        ) : null
                    ))}
                </tbody>
            </table>
        </div>
    );
}
