import React, { useState, useEffect } from "react";

import NavBar from './navBar'
import Menu from './menu/menu'


export default function Admin () {
  const [page, setPage] = useState("Menu");
  const [categories, setCategories] = useState([]);

  return (
      <>
          <NavBar activeButton={page} setPage={setPage}/>
          { page === "Menu" && <Menu categories={categories} setCategories={setCategories}/> }
          {/* { page === "Invertory" && <Inventory/> }
          { page === "Orders" && <Orders/> } */}
      </>
  )
}