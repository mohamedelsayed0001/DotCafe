import React, { useState, useEffect } from "react";
import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'
import '../table.css'

export default function Table({window, setWindow, setSelectedUser, users, setUsers}) {

    return (
        <div style={{ backgroundColor: "#E9EED9", padding: "0.5% 4% 0px 4%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {/* <th className="header-cell">User ID</th> */}
                        <th className="header-cell">User Name</th>
                        <th className="header-cell">Role</th>
                        <th className="header-cell">Address</th>
                        <th className="header-cell">Phone Number</th>
                        <th className="header-cell">Points</th>
                        <th className="header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                            <tr key={user.id}>
                            {/* <td className="table-cell">{user.id}</td> */}
                            <td className="table-cell">{user.name}</td>
                            <td className="table-cell">{user.role}</td> 
                            <td className="table-cell">{user.mail}</td>
                            <td className="table-cell">{user.phoneNumber}</td>
                            <td className="table-cell">{user.points}</td>
                            <td className="table-cell">
                                <button
                                    className="actions-button"
                                    onClick={() => {
                                        setWindow("Edit User");
                                        setSelectedUser(user);
                                    }}
                                >
                                    <img
                                        style={{ width: "25px", height: "25px" }}
                                        src={editIcon}
                                        alt="edit icon"
                                        title="Edit"
                                    />
                                </button>
                            </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
