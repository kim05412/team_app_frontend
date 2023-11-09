import { useEffect, useState } from "react";
import axios from "axios";

type OrderSalesItemProps = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
};

type OrderSalesProps = {
  id: number;
  name: string;
  address: string;
  orderSalesItems: OrderSalesItemProps[];
};

function OrderList() {
  const [orders, setOrders] = useState<OrderSalesProps[]>([]);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h2>Order Name: {order.name}</h2>
          <h3>Address: {order.address}</h3>
          <ul>
            {order.orderSalesItems.map((item) => (
              <li key={item.id}>
                Product Name: {item.productName}, Quantity: {item.quantity}, Unit Price: {item.unitPrice}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
