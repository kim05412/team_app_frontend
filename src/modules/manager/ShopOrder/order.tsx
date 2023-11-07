import { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]); // 주문 정보를 저장할 상태

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8082/store/orders");
    eventSource.onmessage = (event) => {
      try {
        const order = JSON.parse(event.data);
        setOrders((prevOrders) => [...prevOrders, order]);
      } catch (error) {
        console.log("Received non-JSON message: ", event.data);
      }
    };
  }, []);

  const handleApproval = async (orderId) => {
    // 주문 접수 완료 메시지를 서버로 보내는 코드
    // 서버 엔드포인트와 요청 메소드는 서버 설정에 따라 변경해야 합니다.
    try {
      const response = await fetch(`http://localhost:8082/store/orders/${orderId}/approve`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Order approval failed");
      }

      alert("Order approved successfully");
    } catch (error) {
      console.error("Failed to approve order: ", error);
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Items</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>
                {order.orderSalesItems.map((item, i) => (
                  <div key={i}>
                    <p>Product ID: {item.productId}</p>
                    <p>Product Name: {item.productName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Unit Price: {item.unitPrice}</p>
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handleApproval(order.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
