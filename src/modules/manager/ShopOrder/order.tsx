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

  return (
    <div>
      <h1>Orders</h1>
      {orders.map(
        (
          order,
          index, // 주문 정보를 반복하여 출력
        ) => (
          <div key={index}>
            <h2>Order #{order.id}</h2>
            <p>Name: {order.name}</p>
            <p>Address: {order.address}</p>
            <h3>Items</h3>
            {order.orderSalesItems.map((item, i) => (
              <div key={i}>
                <p>Product ID: {item.productId}</p>
                <p>Product Name: {item.productName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: {item.unitPrice}</p>
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  );
};

export default Order;
