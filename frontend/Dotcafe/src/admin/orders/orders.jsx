import { useState, useEffect} from 'react';
import Table from './table';
import '../menu.css'
import OrderDetails from './orderDetails'
import EditOrder from './editOrder'

export default function Orders ({orders, setOrders}) {

    // const fetchOrders = async () => {
    //     try { const response = await fetch('http://localhost:8080/admin/orders');
    //         const data = await response.json(); 
    //         setOrders(data);
    //     } catch (error) {
    //         console.error('Error fetching items:', error); 
    //     } 
    // };

    // useEffect(() => {
    //     fetchOrders();
    // }, []);
    
    const [ordersWindow, setOrdersWindow] = useState("Home")
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                {/* for testing */}
                <button onClick={() => {fetchOrders();}}>refresh</button>
            </div>
            <Table  window={ordersWindow} setWindow={setOrdersWindow} 
                    orders={orders} setOrders={setOrders}
                    setSelectedOrder={setSelectedOrder}/>
            {ordersWindow === "Edit Order" && <EditOrder 
                        ordersWindow={ordersWindow} setOrdersWindow={setOrdersWindow}
                        order={orders} setOrders={setOrders}
                        selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>}
            {ordersWindow === "Ordered Products" && <OrderDetails
                        ordersWindow={ordersWindow} setOrdersWindow={setOrdersWindow}
                        order={orders} setOrders={setOrders}
                        selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>}
        </div>
    )
}