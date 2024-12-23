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
  // const [orders, setOrders] = useState([]);
  const [orders, setOrders] = useState([
    {
        "id": 1,
        "userMail": "user1@example.com",
        "totalPrice": 123.00,
        "orderItems": [
            {
                "id": 101,
                "productId": 1,
                "productName": "Espresso",
                "quantity": 2,
                "size": "MEDIUM",
                "customize": "Extra Shot",
                "price": 50.00,
                "totalPrice": 100.00
            },
            {
                "id": 102,
                "productId": 2,
                "productName": "Croissant",
                "quantity": 1,
                "size": "REGULAR",
                "customize": "No Butter",
                "price": 23.00,
                "totalPrice": 23.00
            }
        ],
        "progress": "ORDER_PLACED",
        "localDateTime": "2024-12-23 'T' 04:40:31"
    },
    {
        "id": 2,
        "userMail": "user2@example.com",
        "totalPrice": 78.00,
        "orderItems": [
            {
                "id": 103,
                "productId": 3,
                "productName": "Latte",
                "quantity": 1,
                "size": "LARGE",
                "customize": "No Sugar",
                "price": 78.00,
                "totalPrice": 78.00
            }
        ],
        "progress": "PREPARING",
        "localDateTime": "2024-12-24 'T' 04:40:31"
    },
    {
        "id": 3,
        "userMail": "user3@example.com",
        "totalPrice": 54.00,
        "orderItems": [
            {
                "id": 104,
                "productId": 4,
                "productName": "Cappuccino",
                "quantity": 1,
                "size": "SMALL",
                "customize": "Extra Foam",
                "price": 54.00,
                "totalPrice": 54.00
            }
        ],
        "progress": "READY",
        "localDateTime": "2024-12-25 'T' 04:40:31"
    }
]
);

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