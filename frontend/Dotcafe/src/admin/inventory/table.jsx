import React, { useState, useEffect } from "react";
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'
import '../table.css'

export default function Table({window, setWindow, setSelectedItem, items, setItems}) {

    const deleteItem = async (itemtId) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/item/${itemtId}`, {
                method: 'DELETE'
            });   
            const data = await response.text(); 
            console.log('delete message:', data);
        } catch (error) {
            console.error('Error deleting product:', error); 
        } 
    };

    const handleDelete = async (itemId) => { 
        await deleteItem(itemId); 
        setItems(items.filter(item => item.id !== itemId));
    };
    
    return (
        <div style={{ backgroundColor: "#E9EED9", padding: "0.5% 4% 0px 4%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th className="header-cell">Item ID</th>
                        <th className="header-cell">Item Name</th>
                        <th className="header-cell">Quantity</th>
                        <th className="header-cell">Item Price</th>
                        <th className="header-cell">Availability</th>
                        <th className="header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                            <tr key={item.id}>
                            <td className="table-cell">{item.id}</td>
                            <td className="table-cell">{item.name}</td>
                            <td className="table-cell">{item.quantity}</td> 
                            <td className="table-cell">${item.price}</td>
                            <td className="table-cell">{item.quantity !== 0 ? 'In Stock' : 'Out of Stock'}</td>
                            <td className="table-cell">
                                <button
                                className="actions-button"
                                onClick={() => {
                                    setSelectedItem(item); 
                                    handleDelete(item.id);
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
                                    setWindow("Edit Item");
                                    setSelectedItem(item);
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
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
