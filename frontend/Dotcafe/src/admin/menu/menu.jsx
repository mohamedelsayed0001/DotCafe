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
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filterBy, setFilterBy] = useState(0);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        if (categories.length > 0) {
            if (filterBy !== 0) {
                setFilteredCategories(categories.filter((category) => category.id === filterBy));
            } else {
                setFilteredCategories(categories);
            }
        }
    }, [filterBy, categories]);

    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => setMenuWindow("New Product")}>New Product</button>
                <button onClick={() => setMenuWindow("New Category")}>New Category</button>
                <button onClick={() => setMenuWindow("Manage Category")}>Manage Category</button>
                {/* for testing */}
                <button onClick={() => {console.log(categories); fetchCategories();}}>refresh</button>
                <select
                    className='filter-by'
                    value={filterBy}
                    onChange={(e) => setFilterBy(Number(e.target.value))}
                    >
                    <option value={0}>No filter</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <Table  window={menuWindow} setWindow={setMenuWindow} 
                    categories={filteredCategories} setCategories={setCategories}
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