import React, { useState, useEffect } from "react";
import "../window.css";
import trashIcon from '../icons/trash.svg';
import editIcon from '../icons/edit.svg';

export default function AddingItem({ inventoryWindow, setInventoryWindow, items, setItems, selectedItem, setSelectedItem }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => { 
        if (inventoryWindow === "Edit Item" && selectedItem) { 
            setName(selectedItem.name || ""); 
            setQuantity(selectedItem.quantity || 0); 
            setPrice(selectedItem.price || 0); 
        } 
    }, [inventoryWindow, selectedItem]);

    const addItem = async (item) => {   
        // console.log(item);

        try {
            const response = await fetch('http://localhost:8080/admin/item', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(item)
            }
        ); 

        if (!response.ok) { 
            const errorText = await response.text(); 
            if(errorText === "Item with the same name already exists.") {
                alert("Item with the same name already exists.")
            }
            console.error('Server error:', errorText); 
            return; 
        }
        const data = await response.json(); 
        console.log('adding message:', data);

        const returnedItem = { 
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: data.quantity
        };

        setItems([...items, returnedItem]);

        } catch (error) {
          console.error('Error adding Item:', error); 
        } 
    };

    const editItem = async (item) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/item/edit/${item.id}`, {
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(item)
            }
        ); 

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            if(errorText === "Another item with the same name already exists.") {
                alert("Another item with the same name already exists.")
            }
            return;
        }
        const data = await response.json(); 
        console.log('editing message:', data);

        const returnedItem = { 
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: data.quantity
        };

        setItems(items.map (item => 
            item.id === selectedItem.id ? returnedItem : item
        ));
          
        } catch (error) {
          console.error('Error adding product:', error); 
        } 
    };

    const handleSave = async () => {
        if(name === "") {
            alert("write item name");
            return;
        } else if (quantity === null) {
            alert("Set item quantity");
            return;
        } else if (price === null) {
            alert("Set item price");
            return;
        }

        const newItem = { 
            id: selectedItem?.id ||null,
            name, 
            quantity: quantity, 
            price, 
        };

        if (inventoryWindow === "Edit Item") {
            await editItem(newItem)
        } else if (inventoryWindow === "New Item") {
            await addItem(newItem);
        }

        setInventoryWindow("Home");
    };    

    const handleCancel = () => {
        setInventoryWindow("Home");
    };

    return (
        <div className="background">
            <div className="window">
                <h3>{inventoryWindow === "New Item" ? "Adding Item" : "Editing Item"}</h3>
                <form>
                    <div className="row">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Type Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <label>Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            placeholder="Type Quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                            min={0}
                        />
                    </div>

                    <div className="row">
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            placeholder="Type Price"
                            onChange={(e) => setPrice(e.target.value)}
                            min={0}
                        />
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
