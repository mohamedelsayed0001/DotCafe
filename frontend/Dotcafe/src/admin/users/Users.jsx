import { useState, useEffect} from 'react';
import Table from './table';
import EditingUser from './EditingUser';
import '../menu.css';

export default function Users ({users, setUsers}) {
    // const [filterBy, setFilterBy] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [usersWindow, setUsersWindow] = useState("Home");
    // const [filteredUsers, setFilteredUsers] = useState(users);

    // useEffect(() => {
    //     if (filterBy === "admin") {
    //         setFilteredUsers(users.filter((user) => user.role === "admin"));
    //     } else if (filterBy === "customer") {
    //         setFilteredUsers(users.filter((user) => user.role === "customer"));
    //     } else {
    //         setFilteredUsers(users);
    //     }
    // }, [filterBy, users]);

    const fetchItems = async () => {
        try { const response = await fetch('http://localhost:8080/customer/users');
            const data = await response.json(); 
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error); 
        } 
    };

    useEffect(() => {
        fetchItems();
    }, []);
    
    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                {/* for testing */}
                <button onClick={() => {console.log(users); fetchItems();}}>refresh</button>
                    {/* <select
                        className='filter-by'
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        >
                        <option value="">No filter</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                    </select> */}
            </div>

            <Table  window={usersWindow} setWindow={setUsersWindow} 
                    users={users} setUsers={setUsers}
                    setSelectedUser={setSelectedUser}/>
            {(usersWindow === "Edit User") && <EditingUser  
                usersWindow={usersWindow} setUsersWindow={setUsersWindow}  
                users={users} setUsers={setUsers} 
                selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
        </div>
    )
}