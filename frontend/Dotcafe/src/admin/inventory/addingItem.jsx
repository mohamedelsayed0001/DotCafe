import React, { useState, useEffect } from "react";
import "../window.css";

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

        try {
            const response = await fetch('http://localhost:8080/admin/item', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(item)
                }
            ); 

            if (!response.ok) { 
                const errorText = await response.text(); 
                alert(errorText)
                return;
            }
            const data = await response.json(); 

            const returnedItem = { 
                id: data.id,
                name: data.name,
                price: data.price,
                quantity: data.quantity
            };

            // setItems([...items, returnedItem]);
            setItems([...items, returnedItem].sort((a, b) => a.id - b.id));

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
                alert(errorText)
                return;
            }
            const data = await response.json(); 

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
          console.error('Error editing item:', error); 
        } 
    };

    const handleSave = async () => {
        if (name === "") {
            alert("Write item name");
            return;
        } else if (quantity === "" || quantity === null) {
            alert("Set item quantity");
            return;
        } else if (price === "" || price === null) {
            alert("Set item price");
            return;
        }

        const newItem = { 
            id: selectedItem && !isNaN(Number(selectedItem.id)) ? Number(selectedItem.id) : null,
            name, 
            quantity: Number(quantity), 
            price: Number(price), 
        };

        console.log(newItem);
        

        if (inventoryWindow === "Edit Item") {
            await editItem(newItem)
        } else if (inventoryWindow === "New Item") {
            await addItem(newItem);
        }

        setInventoryWindow("Home");
        setSelectedItem(null)
    };    

    const handleCancel = () => {
        setSelectedItem(null)
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
