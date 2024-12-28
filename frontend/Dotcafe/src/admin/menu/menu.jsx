import { useState, useEffect} from 'react';
import Table from './table';
import AddingProduct from './addingProduct';
import AddingCategory from './addingCategory';
import ManageCategory from './ManageCategory';
import '../menu.css'

export default function Menu ({categories, setCategories}) {

    const fetchCategories = async () => {
        try { const response = await fetch('http://localhost:8080/admin/menu');
            const data = await response.json(); 
            // setCategories(data);
            setCategories(data.sort((a, b) => a.id - b.id));
        } catch (error) {
            console.error('Error fetching categories:', error); 
        }
        
        setFilteredCategories(categories);
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
        if (filterBy !== 0) {
            setFilteredCategories(categories.filter((category) => category.id === filterBy));
        } else {
            setFilteredCategories(categories);
        }
    }, [filterBy, categories]);

    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => setMenuWindow("New Product")}>New Product</button>
                <button onClick={() => setMenuWindow("New Category")}>New Category</button>
                <button onClick={() => setMenuWindow("Manage Category")}>Manage Category</button>
                {/* for testing */}
                <select
                    className='filter-by'
                    value={filterBy}
                    onChange={(e) => setFilterBy(Number(e.target.value))}
                    style={{marginLeft:'auto'}}
                    >
                    <option value={0}>No filter</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button onClick={() => {fetchCategories();}}>refresh</button>
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