import editIcon from '../icons/edit.svg'
import '../table.css'

export default function Table({window, setWindow, setSelectedOrder, orders, setOrders}) {

    return (
        <div style={{ backgroundColor: "#E9EED9", padding: "0.5% 4% 0px 4%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th className="header-cell">Order ID</th>
                        <th className="header-cell">Customer Mail</th>
                        <th className="header-cell">Date</th>
                        <th className="header-cell">Progress</th>
                        <th className="header-cell">Total Price</th>
                        <th className="header-cell">Ordered Products</th>
                        <th className="header-cell">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                            <tr key={order.id}>
                            <td className="table-cell">{order.id}</td>
                            <td className="table-cell">{order.userMail}</td>
                            <td className="table-cell">{order.localDateTime.replace('\'T\'', ' ')}</td>
                            <td className="table-cell">{order.progress}</td> 
                            <td className="table-cell">${order.total}</td>
                            <td className="table-cell" 
                                style={{ textDecoration: "underline", cursor:'pointer' }}
                                onClick={() => {
                                    setWindow("Ordered Products");
                                    setSelectedOrder(order);
                                }}
                                >Ordered Products</td>
                            <td className="table-cell">
                                <button
                                className="actions-button"
                                onClick={() => {
                                    setWindow("Edit Order");
                                    setSelectedOrder(order);
                                }}
                                >
                                <img
                                    style={{ width: "25px", height: "25px" }}
                                    src={editIcon}
                                    alt="edit icon"
                                    title="Edit"
                                />
                                </button>
                            </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
