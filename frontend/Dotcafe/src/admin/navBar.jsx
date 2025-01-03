import React from "react";
import "./navbar.css";

export default function Navbar({ activeButton, setPage, setMainWindow, setUserState }){
    return (
        <div className="navbar-container">
            <button className={`button ${activeButton === "Inventory" ? "active" : ""}`}
                onClick={() => setPage("Inventory")}
            >Inventory</button>
            <button className={`button ${activeButton === "Menu" ? "active" : ""}`}
                onClick={() => setPage("Menu")}
            >Menu</button>
            <button className={`button ${activeButton === "Orders" ? "active" : ""}`}
                onClick={() => setPage("Orders")}
            >Orders</button>
            <button className={`button ${activeButton === "Users" ? "active" : ""}`}
                onClick={() => setPage("Users")}
            >Users</button>
            <button className={`logout-button ${activeButton === "Log Out" ? "active" : ""}`}
                onClick={() => {
                    setMainWindow("home");
                    setUserState(false);
                }}
            >Log Out</button>
        </div>
    );
}
