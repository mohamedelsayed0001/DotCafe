import React, { useState } from "react";
import "./window.css";
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'

export default function AddingProduct({ window, setWindow}) {

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
            <h3>{window === "New Product" ? "Adding Product" : "Editing Product"}</h3>
            <form>
                <div className="row">
                    <label>Name</label>
                    <input type="text" placeholder="Type Name" />
                </div>

                <div className="row">
                    <label>Category</label>
                    <select>
                        <option>Choose Category</option>
                    </select>
                </div>

                <div className="row">
                    <label>Price</label>
                    <input type="number" placeholder="Type Price" />
                </div>

                <div className="row">
                    <label>Description</label>
                    <textarea placeholder="Type Description"></textarea>
                </div>

                <div className="row">
                    <label>Size</label>
                    <div className="size-options">
                        <input type="radio" id="small" name="size" value="Small" />
                        <label htmlFor="small" className="size-button">Small</label>

                        <input type="radio" id="medium" name="size" value="Medium" />
                        <label htmlFor="medium" className="size-button">Medium</label>

                        <input type="radio" id="large" name="size" value="Large" />
                        <label htmlFor="large" className="size-button">Large</label>
                    </div>
                </div>

                <div className="image-upload">
                    <label>Image</label>
                    <div className="image-preview">image</div>
                    <div className="image-buttons">
                        <button> <img style={{width: "32px", height: "32px"}} src={trashIcon} alt="trash icon" title="Delete Image" /> </button>
                        <button> <img style={{width: "32px", height: "32px"}} src={editIcon} alt="edit icon" title="Edit Image" /> </button>
                    </div>
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
