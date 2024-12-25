import React, { useState, useEffect } from "react";

import NavBar from './navBar'
import Menu from './menu/menu'
import Inventory from './inventory/Inventory'
import Users from './users/Users'
import Orders from './orders/orders'


export default function Admin ({setMainWindow, setUserState}) {
  const [page, setPage] = useState("Inventory");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
      <>
          <NavBar activeButton={page} setPage={setPage} 
                  setMainWindow={setMainWindow} setUserState={setUserState}/>
          { page === "Menu" && <Menu categories={categories} setCategories={setCategories}/> }
          { page === "Inventory" && <Inventory items={items} setItems={setItems}/> }
          { page === "Orders" && <Orders orders={orders} setOrders={setOrders}/> }
          { page === "Users" && <Users users={users} setUsers={setUsers}/> }
      </>
  )
}