import { useEffect, useState } from "react";
import axios from "axios";
import OrderModal from "./OrderModal";
import {
  OrderListContainer,
  OrderTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  OrderButton,
} from "./order.style";

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
  const [selectedOrder, setSelectedOrder] = useState<OrderSalesProps | null>(null);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const openModal = (order: OrderSalesProps) => {
    setSelectedOrder(order);
    console.log(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleOrderConfirm = (order: OrderSalesProps) => {
    axios.post("/api/orders/confirm", order).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <OrderListContainer>
      <OrderTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>
                <OrderButton onClick={() => openModal(order)}>Order Detail</OrderButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </OrderTable>

      <OrderModal order={selectedOrder} onClose={closeModal} onOrderConfirm={handleOrderConfirm} />
    </OrderListContainer>
  );
}

export default OrderList;
