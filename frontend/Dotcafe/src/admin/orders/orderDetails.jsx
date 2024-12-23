import React, { useState, useEffect } from "react";
import "../window.css";

export default function OrderDetails({ ordersWindow, setOrdersWindow, orders, setOrders, selectedOrder, setSelectedOrder}) {
   const handleCancel = () => {
      setOrdersWindow("Home");
   }

   return (
      <div className="background">
         <div className="window" style={{width:'650px'}}>
            <h3>{"Ordered Products"}</h3>
            {selectedOrder && (
               <>
               <div className="row">
                  <ul>
                     {selectedOrder.orderItems.map((item) => (
                        <li key={item.id}>
                           <strong>{item.productName}</strong> - {item.quantity} x {item.size} 
                           {item.customize && ` (${item.customize})`} @ ${item.price.toFixed(2)} each = ${item.totalPrice.toFixed(2)}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="actions">
                  <button onClick={handleCancel}>Back</button>
               </div>
               </>
            )}
         </div>
      </div>
   );
}
