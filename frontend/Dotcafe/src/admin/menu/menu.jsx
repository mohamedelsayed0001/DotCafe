import { useState, useEffect} from 'react';
import Table from './table';
import AddingProduct from './addingProduct';
import AddingCategory from './addingCategory';
import ManageCategory from './ManageCategory';
import '../menu.css'

export default function Menu ({categories, setCategories}) {

    const fetchCategories = async () => {
        try { const response = await fetch('http://localhost:8080/menu');
            const data = await response.json(); 
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error); 
        } 
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const [menuWindow, setMenuWindow] = useState("Home")
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("")

    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => setMenuWindow("New Product")}>New Product</button>
                <button onClick={() => setMenuWindow("New Category")}>New Category</button>
                <button onClick={() => setMenuWindow("Manage Category")}>Manage Category</button>
                {/* for testing */}
                <button onClick={() => {console.log(categories); fetchCategories();}}>refresh</button>
            </div>
            <Table  window={menuWindow} setWindow={setMenuWindow} 
                    categories={categories} setCategories={setCategories}
                    setSelectedProduct={setSelectedProduct}/>
            {(menuWindow === "New Product" || menuWindow === "Edit Product") && <AddingProduct  
                menuWindow={menuWindow} setMenuWindow={setMenuWindow}  
                categories={categories} setCategories={setCategories} 
                selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>}
            {(menuWindow === "New Category" || menuWindow === "Edit Category") && <AddingCategory   
                menuWindow={menuWindow} setMenuWindow={setMenuWindow} 
                categories={categories} setCategories={setCategories} 
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}
            {menuWindow === "Manage Category" && <ManageCategory   
                menuWindow={menuWindow} setMenuWindow={setMenuWindow} 
                categories={categories} setCategories={setCategories} 
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}
        </div>
    )
}