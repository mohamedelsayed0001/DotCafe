import React, { useState } from "react";
import "./window.css";

export default function AddingCategory({ window, setWindow}) {

    const handleSave = () => {
        // logic of saving
        setWindow("Home");
    }

    const handleCancel = () => {
        setWindow("Home");
    }

  return (
    <div className="background">
        <div className="window">
            <h3>{window === "New Category" ? "Adding Category" : "Editing Category" }</h3>
            <form>
                <div className="row">
                    <label>Name</label>
                    <input type="text" placeholder="Type Name" />
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
