import { useState } from 'react';
import Table from './table';
import AddingProduct from './addingProduct';
import AddingCategory from './addingCategory';
import ManageCategory from './ManageCategory';
import './menu.css'

export default function Menu () {
    const  sampleData = [
        {   index:0,
            id: "1",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1875",
            name: "Espresso Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "10.50",
        },
        {
            id: "1876",
            name: "Latte Beans",
            category: "Coffee Beans",
            availability: "Out of Stock",
            price: "12.30",
        },
        {
            id: "1877",
            name: "Cappuccino Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "15.00",
        },
        {
            id: "1878",
            name: "Decaf Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "8.00",
        },
        {
            id: "1879",
            name: "Cold Brew Beans",
            category: "Coffee Beans",
            availability: "In Stock",
            price: "9.25",
        },
        {
            id: "1880",
            name: "Arabica Beans",
            category: "Coffee Beans",
            availability: "Out of Stock",
            price: "13.00",
        },
    ];
    
    const [window, setWindow] = useState("Home")
    const [data, setData] = useState(sampleData);
    const [currentProduct, setCurrentProduct] = useState(null);

    return (
        <div style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => setWindow("New Product")}>New Product</button>
                <button onClick={() => setWindow("New Category")}>New Category</button>
                <button onClick={() => setWindow("Manage Category")}>Manage Category</button>
            </div>
            <Table window={window} setWindow={setWindow} data={data} setData={setData} setCurrentID={setCurrentProduct}/>
            {(window === "New Product" || window === "Edit Product") && <AddingProduct  window={window} setWindow={setWindow}  data={data} setData={setData} currentID={currentProduct} setCurrentID={setCurrentProduct}/>}
            {(window === "New Category" || window === "Edit Category") && <AddingCategory window={window} setWindow={setWindow}/>}
            {window === "Manage Category" && <ManageCategory window={window} setWindow={setWindow}/>}
        </div>
    )
}