import { useState, useEffect} from 'react';
import Table from './table';
import '../menu.css'
import OrderDetails from './orderDetails'
import EditOrder from './editOrder'
import { Client } from "@stomp/stompjs";

export default function Orders ({orders, setOrders}) {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);
     const [connected, setConnected] = useState(false);

    const fetchOrders = async () => {
        try { const response = await fetch(`http://localhost:8080/admin/orders?page=${page}&size=${size}`);
            if (!response.ok) {
                const response = await response.text();
                alert(response);
                return;
            } else {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching items:', error); 
        } 
    };

      useEffect(() => {
        fetchOrders();
      }, []);
    
    
      useEffect(() => {
        // Create a new STOMP client
        const client = new Client({
          brokerURL: "ws://localhost:8080/ws",
          reconnectDelay: 1000,
          onConnect: () => {
            console.log("Connected to WebSocket");
            setConnected(true);
    
            client.subscribe(`/track/admin/order`, (message) => {
                setOrders(prevOrders => [message.body, ...prevOrders]);
                console.log(message.body)
                console.log(orders)
              
            });
          },
          onDisconnect: () => {
            console.log("Disconnected from WebSocket");
            setConnected(false);
          },
          onStompError: (error) => {
            console.error("STOMP error:", error);
          },
        });
    
        client.activate();
    
        return () => {
          client.deactivate();
        };
      }, []);

    const handlePrevious = async () => {
        if(page === 0) {
            return;
        } else {
            setPage(page - 1);
        }
    }

    const handleNext = async () => {
        if(page === 0) {
            return;
        } else {
            setPage(page + 1);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [page, size]);
    
    const [ordersWindow, setOrdersWindow] = useState("Home")
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className= 'menu-page' style={{ backgroundColor: "#E9EED9", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
            <div className='new-manage-buttons'>
                <button onClick={() => {fetchOrders();}}>refresh</button>
                <button onClick={() => {handlePrevious();}} style={{padding:'0 1% 0 1%', marginLeft:'auto'}}>Previous</button>
                <button disabled style={{padding:'0 2% 0 2%', cursor:'default'}}>1</button>
                <button onClick={() => {handleNext();}} style={{padding:'0 1% 0 1%'}}>Next</button>
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