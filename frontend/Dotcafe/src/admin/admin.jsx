import React, { useState, useEffect } from "react";

import NavBar from './navBar'
import Menu from './menu/menu'


export default function Admin () {
    const [page, setPage] = useState("Menu");
    const [categories, setCategories] = useState([
        {
          "id": 1,
          "name": "Coffee Beans",
          "products": [
            {
              "id": 101,
              "name": "Espresso Blend",
              "category": 1,
              "price": 12.99,
              "inStock": true
            }
            ,
            {
              "id": 102,
              "name": "Light Roast",
              "category": 1,
              "price": 9.99,
              "inStock": false
            }
          ]
        },
        {
          "id": 2,
          "name": "Tea Leaves",
          "products": [
            {
              "id": 201,
              "name": "Green Tea",
              "category": 2,
              "price": 5.99,
              "inStock": true
            }
          ]
        },
        {
          "id": 3,
          "name": "Herbal",
          "products": []
        }
      ]
      );

    return (
        <>
            <NavBar activeButton={page} setPage={setPage}/>
            { page === "Menu" && <Menu categories={categories} setCategories={setCategories}/> }
            {/* { page === "Invertory" && <Inventory/> }
            { page === "Orders" && <Orders/> } */}
        </>
    )
}