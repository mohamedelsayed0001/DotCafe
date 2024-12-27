import { useState, useEffect} from 'react';
import Table from './table';
import AddingItem from './addingItem';
import '../menu.css'

export default function Inventory ({items, setItems}) {

    const fetchItems = async () => {
        try { const response = await fetch('http://localhost:8080/admin/item');
            const data = await response.json(); 
            // setItems(data);
            setItems(data.sort((a, b) => a.id - b.id));
        } catch (error) {
            console.error('Error fetching items:', error);
        } 
    };

    useEffect(() => {
        fetchItems();
    }, []);
    
    const [inventoryWindow, setInventoryWindow] = useState("Home")
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => setInventoryWindow("New Item")}>New Item</button>
                {/* for testing */}
                <button onClick={() => {fetchItems();}} style={{marginLeft:'auto'}}>refresh</button>
            </div>
            <Table  window={inventoryWindow} setWindow={setInventoryWindow} 
                    items={items} setItems={setItems}
                    setSelectedItem={setSelectedItem}/>
            {(inventoryWindow === "New Item" || inventoryWindow === "Edit Item") && <AddingItem  
                inventoryWindow={inventoryWindow} setInventoryWindow={setInventoryWindow}  
                items={items} setItems={setItems} 
                selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>}
        </div>
    )
}