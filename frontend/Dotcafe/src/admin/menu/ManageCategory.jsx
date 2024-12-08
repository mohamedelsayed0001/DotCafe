import React, { useState } from "react";
import "./window.css";
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'

export default function ManageCategory({ window, setWindow}) {

    const sampleData = [
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1875",
            name: "Espresso Beans",
        },
        {
            id: "1876",
            name: "Latte Beans",
        },
        {
            id: "1877",
            name: "Cappuccino Beans",
        },
        {
            id: "1878",
            name: "Decaf Beans",
        },
        {
            id: "1879",
            name: "Cold Brew Beans",
        },
        {
            id: "1880",
            name: "Arabica Beans",
        },
    ];
    
    const [data, setData] = useState(sampleData);

    const handleCancel = () => {
        setWindow("Home");
    }

  return (
    <div className="background">
        <div className="window" style={{width: "750px", maxHeight: "600px" , overflowY: "auto"}}>
            <div style={{display:"flex", gap: "60%"}}>
                <h3>Manage Category</h3>
                <div className="actions">
                    <button onClick={handleCancel}>Back</button>
                </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th className="header-cell" >Category ID</th>
                        <th className="header-cell" >Category Name</th>
                        <th className="header-cell" >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((category) => (
                        <tr key={category.id} style={{borderTop: "2px solid black"}}>
                            <td className="table-cell">{category.id}</td>
                            <td className="table-cell">{category.name}</td>
                            <td className="table-cell">
                                <button className="actions-button"> 
                                    <img style={{width: "25px", height: "25px"}} src={trashIcon} alt="trash icon" title="Delete" /> 
                                </button>
                                <button className="actions-button"
                                    onClick={() => setWindow("Edit Category")}> 
                                    <img style={{width: "25px", height: "25px"}} src={editIcon} alt="edit icon" title="Edit" /> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
