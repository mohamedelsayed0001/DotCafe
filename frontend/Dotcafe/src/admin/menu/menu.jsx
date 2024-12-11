import { useState, useEffect} from 'react';
import Table from './table';
import AddingProduct from './addingProduct';
import AddingCategory from './addingCategory';
import ManageCategory from './ManageCategory';
import './menu.css'

export default function Menu ({categories, setCategories}) {

    // useEffect(() => {
    //     fetch("localhost:8080/menu")
    //         .then((response) => response.json())
    //         .then((data) => setCategories(data))
    //         .catch((error) => console.error("Error fetching menu:", error));
    //         console.log(categories);
    // }, []);
    
    const [menuWindow, setMenuWindow] = useState("Home")
    const [currentProduct, setCurrentProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("")

    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => setMenuWindow("New Product")}>New Product</button>
                <button onClick={() => setMenuWindow("New Category")}>New Category</button>
                <button onClick={() => setMenuWindow("Manage Category")}>Manage Category</button>
            </div>
            <Table  window={menuWindow} setWindow={setMenuWindow} 
                    categories={categories} setCategories={setCategories} 
                    setCurrentID={setCurrentProduct}/>
            {(menuWindow === "New Product" || menuWindow === "Edit Product") && <AddingProduct  menuWindow={menuWindow} setMenuWindow={setMenuWindow}  
                                                                                                categories={categories} setCategories={setCategories} 
                                                                                                currentID={currentProduct} setCurrentID={setCurrentProduct}/>}
            {(menuWindow === "New Category" || menuWindow === "Edit Category") && <AddingCategory   menuWindow={menuWindow} setMenuWindow={setMenuWindow} 
                                                                                                    categories={categories} setCategories={setCategories} 
                                                                                                    selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}
            {menuWindow === "Manage Category" && <ManageCategory    menuWindow={menuWindow} setMenuWindow={setMenuWindow} 
                                                                    categories={categories} setCategories={setCategories} 
                                                                    selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}
        </div>
    )
}