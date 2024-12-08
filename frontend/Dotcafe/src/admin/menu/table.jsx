import React, { useState, useEffect } from "react";
import upDownArrowIcon from '../icons/up-down-arrow.svg'
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'
import './table.css'

export default function Table({window, setWindow}) {
    const sampleData = [
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
    
    // const [data, setData] = useState([]);
    const [data, setData] = useState(sampleData);
    const [sortConfig, setSortConfig] = useState(null);


    // useEffect(() => {
    //     // Fetch data from backend
    //     fetch("/api/items")
    //         .then((response) => response.json())
    //         .then((data) => setData(data));
    // }, []);

    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) =>
            prev?.key === key && prev.direction === "asc"
                ? { key, direction: "desc" }
                : { key, direction: "asc" }
        );
    };

    return (
        <div style={{ backgroundColor: "#E9EED9", padding: "0.5% 4% 0px 4%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th className="header-cell" onClick={() => handleSort("id")}>Item ID</th>
                        <th className="header-cell" onClick={() => handleSort("name")}>Item Name</th>
                        <th className="header-cell" onClick={() => handleSort("category")}>Category</th>
                        <th className="header-cell" onClick={() => handleSort("availability")}>Availability</th>
                        <th className="header-cell" onClick={() => handleSort("price")}>Item Price</th>
                        <th className="header-cell" >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.id}>
                            <td className="table-cell">{item.id}</td>
                            <td className="table-cell">{item.name}</td>
                            <td className="table-cell">{item.category}</td>
                            <td className="table-cell">{item.availability}</td>
                            <td className="table-cell">{item.price}</td>
                            <td className="table-cell">
                            <button className="actions-button"> <img style={{width: "25px", height: "25px"}} src={trashIcon} alt="trash icon" title="Delete" /> </button>
                            <button className="actions-button" onClick={() => setWindow("Edit Product")}> <img style={{width: "25px", height: "25px"}} src={editIcon} alt="edit icon" title="Edit" /> </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
