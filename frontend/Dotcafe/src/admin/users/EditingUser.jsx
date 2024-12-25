import React, { useState, useEffect } from "react";
import "../window.css";

export default function EditingUser({ usersWindow, setUsersWindow, users, setUsers, selectedUser, setSelectedUser }) {
    const [role, setRole] = useState(null);
    const [points, setPoints] = useState(null);

    useEffect(() => { 
        if (usersWindow === "Edit User" && selectedUser) {
            setRole(selectedUser.role || ""); 
            setPoints(selectedUser.points || 0); 
        } 
    }, [usersWindow, selectedUser]);

    const editUser = async (user) => {
        try {
            const response = await fetch(`http://localhost:8080/admin/update`, {
                method: 'Post', 
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(user)
            }
        ); 

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            return;
        }
        const data = await response.json(); 
        console.log('editing message:', data);

        const returnedUser = { 
            mail:data.mail,
            id: data.id,
            name: data.name,
            role: data.role,
            points: data.points,
            password: data.password,
            phoneNumber: data.phoneNumber
        };

        setUsers(users.map (user => 
            user.id === selectedUser.id ? returnedUser : user
        ));
          
        } catch (error) {
          console.error('Error editing user:', error); 
        } 
    };

    const handleSave = async () => {

        const newUser = { 
            id: selectedUser?.id,
            role: role, 
            points: points, 
        };

        if (usersWindow === "Edit User") {
            await editUser(newUser)
        }

        setUsersWindow("Home");
    };    

    const handleCancel = () => {
        setUsersWindow("Home");
    };

    return (
        <div className="background">
            <div className="window">
                <h3>Editing User</h3>
                <form>
                    <div className="row">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value={"admin"}>
                                Admin
                            </option>
                            <option value={"customer"}>
                                Customer
                            </option>
                        </select>
                    </div>

                    <div className="row">
                        <label>Points</label>
                        <input
                            type="number"
                            value={points}
                            placeholder="Type Price"
                            onChange={(e) => setPoints(e.target.value)}
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
