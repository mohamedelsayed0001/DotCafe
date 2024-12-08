import React, { useState, useEffect } from "react";

import NavBar from './navBar'
import Menu from './menu/menu'


export default function Admin () {
    const [page, setPage] = useState("Menu")

    return (
        <>
            <NavBar activeButton={page} setPage={setPage}/>
            { page === "Menu" && <Menu/> }
            {/* { page === "Invertory" && <Inventory/> }
            { page === "Orders" && <Orders/> } */}
        </>
    )
}