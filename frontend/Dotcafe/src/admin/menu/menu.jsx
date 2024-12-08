import { useState } from 'react';
import Table from './table';
import AddingProduct from './addingProduct';
import AddingCategory from './addingCategory';
import ManageCategory from './ManageCategory';
import './menu.css'

export default function Menu () {
    const [window, setWindow] = useState("Home")
    return (
        <div style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => setWindow("New Product")}>New Product</button>
                <button onClick={() => setWindow("New Category")}>New Category</button>
                <button onClick={() => setWindow("Manage Category")}>Manage Category</button>
            </div>
            <Table window={window} setWindow={setWindow}/>
            {(window === "New Product" || window === "Edit Product") && <AddingProduct window={window} setWindow={setWindow}/>}
            {(window === "New Category" || window === "Edit Category") && <AddingCategory window={window} setWindow={setWindow}/>}
            {window === "Manage Category" && <ManageCategory window={window} setWindow={setWindow}/>}
        </div>
    )
}