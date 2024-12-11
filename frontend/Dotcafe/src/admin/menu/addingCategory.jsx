import React, { useState, useEffect } from "react";
import "./window.css";

export default function AddingCategory({ menuWindow, setMenuWindow, categories, setCategories, selectedCategory, setSelectedCategory}) {

    const [newCategoryName, setNewCategoryName] = useState("")

    useEffect(() => {
        if(menuWindow === "Edit Category" && selectedCategory) {
            setNewCategoryName(selectedCategory.name)
        }
    }, [selectedCategory, menuWindow])

    const handleSave = async () => {
        if(menuWindow === 'New Category') {
            // try {
            //     const response = await fetch("localhost:8080/admin/category", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(
            //             {
            //                 "id" : 0,
            //                 "name": newCategoryName,
            //                 "products": null
            //             }
            //         ),
            //     });
    
            //     if (response.ok) {
            //         setMessage("Category created successfully!");
            //         setNewCategoryName('');
            //     } else {
            //         const errorData = await response.json();
            //         setMessage(`Error: ${errorData.message || "Failed to create category"}`);
            //     }
            // } catch (error) {
            //     setMessage(`Error: ${error.message}`);
            // }
            const newCategory = {
                id: categories.length,
                name: newCategoryName,
                products: [],
            };
            setCategories([...categories, newCategory]);
            setNewCategoryName('y')
        } else if (menuWindow === 'Edit Category') {
            // try {
            //     const response = await fetch("localhost:8080/admin/edit/{id}", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(
            //             {
            //                 "id" : 0,
            //                 "name": newCategoryName,
            //                 "products": null
            //             }
            //         ),
            //     });
    
            //     if (response.ok) {
            //         setMessage("Category created successfully!");
            //         setNewCategoryName('');
            //     } else {
            //         const errorData = await response.json();
            //         setMessage(`Error: ${errorData.message || "Failed to create category"}`);
            //     }
            // } catch (error) {
            //     setMessage(`Error: ${error.message}`);
            // }
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === selectedCategory.id
                        ? { ...category, name: newCategoryName }
                        : category
                )
            );
            setNewCategoryName('x')
        }
        
        setMenuWindow("Home");
    }

    const handleCancel = () => {
        setNewCategoryName('')
        setMenuWindow("Home");
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
