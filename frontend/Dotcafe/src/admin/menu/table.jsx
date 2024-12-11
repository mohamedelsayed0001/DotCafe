import React, { useState, useEffect } from "react";
import upDownArrowIcon from '../icons/up-down-arrow.svg'
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'
import './table.css'

export default function Table({window, setWindow, setCurrentID, categories, setCategories}) {

    const [sortConfig, setSortConfig] = useState(null);

    // function handelDelete(id) {
    //     const newData = data.filter(item => item.id !== id);
    //     setData(newData);
    //  //   fetchDelete();///send request to delete from data base with id 
    // }
    const handelDelete = (productId) => {
        setCategories(prevCategories => 
            prevCategories.map(category => 
                category.products 
                    ? { 
                        ...category, 
                        products: category.products.filter(product => product.id !== productId)
                    }
                    : category
            )
        );
    };
    
    return (
        <div style={{ backgroundColor: "#E9EED9", padding: "0.5% 4% 0px 4%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th className="header-cell">Item ID</th>
                        <th className="header-cell">Item Name</th>
                        <th className="header-cell">Category</th>
                        <th className="header-cell">Availability</th>
                        <th className="header-cell">Item Price</th>
                        <th className="header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        category.products && category.products.length > 0 ? (
                        category.products.map((product) => (
                            <tr key={product.id}>
                            <td className="table-cell">{product.id}</td>
                            <td className="table-cell">{product.name}</td>
                            <td className="table-cell">{categories[product.category].name}</td>
                            <td className="table-cell">{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                            <td className="table-cell">${product.price}</td>
                            <td className="table-cell">
                                <button
                                className="actions-button"
                                onClick={() => handelDelete(product.id)}
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
                                    setCurrentID(product.id);
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
                        ) : null // Do nothing for categories without products
                    ))}
                </tbody>
            </table>
        </div>
    );
}
