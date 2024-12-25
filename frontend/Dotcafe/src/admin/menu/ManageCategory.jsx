import React, { useState } from "react";
import "../window.css";
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'

export default function ManageCategory({ menuWindow, setMenuWindow, categories, setCategories, selectedCategory, setSelectedCategory}) {

    const handleDelete = async (categoryId) => {
        const userConfirmed = confirm("Deleteing this Category will lead to the deleting all the products inside it, Are you sure u want to delete it ?");

        if (userConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/admin/category/${categoryId}`, {
                        method: 'DELETE'
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server error:', errorText);
                    return;
                } else {
                    const data = await response.text();
                    console.log('deleting category message:', data);
                    setCategories(categories.filter(category => category.id !== categoryId));
                }

            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    }

    const handleBack = () => {
        setMenuWindow("Home")
    }

  return (
    <div className="background">
        <div className="window" style={{width: "750px", maxHeight: "750px" , overflowY: "auto"}}>
            <div style={{display:"flex", gap: "60%"}}>
                <h3>Manage Category</h3>
                <div className="actions">
                    <button onClick={handleBack}>Cancel</button>
                </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th className="header-cell" >Category ID</th>
                        <th className="header-cell" >Category Name</th>
                        <th className="header-cell" >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} style={{borderTop: "2px solid black"}}>
                            <td className="table-cell">{category.id}</td>
                            <td className="table-cell">{category.name}</td>
                            <td className="table-cell">
                                <button className="actions-button"
                                    onClick={() => {
                                        handleDelete(category.id)
                                        }}
                                        >
                                    <img 
                                        style={{width: "25px", height: "25px"}} 
                                        src={trashIcon} 
                                        alt="trash icon" 
                                        title="Delete" /> 
                                </button>
                                <button className="actions-button"
                                    onClick={() => {
                                        setMenuWindow("Edit Category")
                                        setSelectedCategory(category)
                                        }}> 
                                    <img    
                                        style={{width: "25px", height: "25px"}} 
                                        src={editIcon} 
                                        alt="edit icon" 
                                        title="Edit"
                                        />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
