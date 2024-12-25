import React, { useState, useEffect } from "react";
import "../window.css";

export default function OrderDetails({ ordersWindow, setOrdersWindow, orders, setOrders, selectedOrder, setSelectedOrder}) {
   
   const handleCancel = () => {
      setOrdersWindow("Home");
   }

   return (
      <div className="background">
         <div className="window" style={{width:'1000px', maxHeight: "750px" , overflowY: "auto"}}>
            <div style={{display:"flex", gap: "70%"}}>
                <h3>Ordered Products</h3>
                <div className="actions">
                    <button onClick={handleCancel}>Back</button>
                </div>
            </div>
            
            {selectedOrder && (
               <>
                  <table style={{ width: "100%", borderCollapse: "collapse"}}>
                     <thead>
                        <tr>
                              <th className="header-cell" >Product ID</th>
                              <th className="header-cell" >Product Name</th>
                              <th className="header-cell" >Quantity</th>
                              <th className="header-cell" >Size</th>
                              <th className="header-cell" >Product Cost</th>
                              <th className="header-cell">Customization</th>
                        </tr>
                     </thead>
                     <tbody>
                        {selectedOrder.orderItems.map((product) => (
                           <tr key={product.id} style={{borderTop: "2px solid black"}}>
                              <td className="table-cell">{product.id}</td>
                              <td className="table-cell">{product.productName}</td>
                              <td className="table-cell">{product.quantity}</td>
                              <td className="table-cell">{product.size}</td>
                              <td className="table-cell">{product.price}</td>
                              <td className="table-cell">{product.customize}</td>
                           </tr> 
                        ))}
                     </tbody>
                  </table>
               </>
            )}
         </div>
      </div>
   );
}
