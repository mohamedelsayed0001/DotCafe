import React, { useState, useEffect } from "react";
import "../window.css";

export default function EditOrder({ ordersWindow, setOrdersWindow, orders, setOrders, selectedOrder, setSelectedOrder}) {

   const [newProgress, setNewProgress] = useState("")

   useEffect(() => {
      if(ordersWindow === "Edit Order" && selectedOrder) {
         setNewProgress(selectedOrder.progress)
      }
   }, [selectedOrder, ordersWindow])

   const editOrder = async (orderId) => {
      try {
         const response = await fetch(`http://localhost:8080/admin/order/${orderId}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(
               newProgress
            )
         }); 

         if (!response.ok) { 
               const errorText = await response.text(); 
               alert(errorText);
               return; 
         }
         const data = await response.json(); 
         console.log('editing progress message :', data);

         setOrders((prevOrders) =>
            prevOrders.map((order) =>
               order.id === orderId ? { ...order, progress: newProgress } : order
            )
         );

      } catch (error) {
         console.error('Error Updtating Progress:', error); 
      } 
   };

   const handleSave = async () => {
      editOrder(selectedOrder.id);
      setOrdersWindow("Home");
   }

   const handleCancel = () => {
      setNewProgress('')
      setOrdersWindow("Home");
   }

   return (
      <div className="background">
         <div className="window" >
            <h3>{"Edit Order"}</h3>
            {selectedOrder && (
               <>
               <form>
                  <div className="row">
                  <label><strong> Current Progress:</strong></label>
                     <select value={newProgress} onChange={(e) => setNewProgress(e.target.value)}>
                        <option value="Placed">Placed</option>
                        <option value="Prepairing">Prepairing</option>
                        <option value="Ready">Ready</option>
                     </select>
                  </div>
               </form>

               <div className="actions">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSave}>Save</button>
               </div>
               </>
            )}
         </div>
      </div>
   );
}
