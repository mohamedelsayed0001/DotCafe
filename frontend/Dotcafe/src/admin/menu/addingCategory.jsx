import React, { useState, useEffect } from "react";
import "../window.css";

export default function AddingCategory({ menuWindow, setMenuWindow, categories, setCategories, selectedCategory, setSelectedCategory}) {

    const [newCategoryName, setNewCategoryName] = useState("")

    useEffect(() => {
        if(menuWindow === "Edit Category" && selectedCategory) {
            setNewCategoryName(selectedCategory.name)
        }
    }, [selectedCategory, menuWindow])

    const addCategory = async (category) => {
        try {
            const response = await fetch('http://localhost:8080/admin/category', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json'}, 
                    body: JSON.stringify(category)
                }
            ); 

            if (!response.ok) { 
                const errorText = await response.text();
                alert(errorText);
                return; 
            }
            const data = await response.json(); 

            const returnedCategory = { 
                id: data.id,
                name: data.name,
                products: data.products,
            };

            // setCategories([...categories, returnedCategory]);
            setCategories([...categories, returnedCategory].sort((a, b) => a.id - b.id));

        } catch (error) {
            console.error('Error adding category:', error); 
        } 
    };

    const editCategory = async (category) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/category/edit/${category.id}`, {
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/json'}, 
                    body: JSON.stringify(category)
                }
            ); 

            if (!response.ok) { 
                const errorText = await response.text(); 
                alert(errorText);
                return; 
            }
            const data = await response.json(); 

            const returnedCategory = { 
                id: data.id,
                name: data.name,
                products: data.products,
            };

            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === selectedCategory.id
                        ? { ...category, name: newCategoryName }
                        : category
                )
            );

        } catch (error) {
            console.error('Error editing category:', error); 
        } 
    };

    const handleSave = async () => {
        const newCategory = {
            id: selectedCategory && !isNaN(Number(selectedCategory.id)) ? Number(selectedCategory.id) : 0,
            name: newCategoryName,
            products: [],
        };

        if(menuWindow === 'New Category') {
            addCategory(newCategory);
        } else if (menuWindow === 'Edit Category') {
            editCategory(newCategory)
        }
        
        setMenuWindow("Manage Category");
        setSelectedCategory(null)
    }

    const handleCancel = () => {
        setNewCategoryName('')
        setSelectedCategory(null)
        setMenuWindow("Manage Category");
    }

  return (
    <div className="background">
        <div className="window">
            <h3>{menuWindow === "New Category" ? "Adding Category" : "Editing Category" }</h3>
            <form>
                <div className="row">
                    <label>Name</label>
                    <input 
                        type="text" 
                        placeholder="type Name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}/>
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
