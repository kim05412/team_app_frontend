import { FC } from "react";
import Modal from "react-modal";
import { ModalContainer, ModalTitle, ModalSubtitle, OrderItem, CloseButton, OrderButton } from "./order.style";

Modal.setAppElement("#root");

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

type OrderModalProps = {
  order: OrderSalesProps | null;
  onClose: () => void;
  onOrderConfirm: (order: OrderSalesProps) => void;
};

const OrderModal: FC<OrderModalProps> = ({ order, onClose, onOrderConfirm }) => {
  return (
    <Modal isOpen={order !== null} onRequestClose={onClose} contentLabel="Order Detail">
      {order && (
        <ModalContainer>
          <ModalTitle>Order Name: {order.name}</ModalTitle>
          <ModalSubtitle>Address: {order.address}</ModalSubtitle>
          <ul>
            {order.orderSalesItems.map((item) => (
              <OrderItem key={item.id}>
                Item ID: {item.id}, Product ID: {item.productId}, Product Name: {item.productName}, Quantity:{" "}
                {item.quantity}, Unit Price: {item.unitPrice}, Total Price: {item.quantity * item.unitPrice}
              </OrderItem>
            ))}
          </ul>
          <OrderButton onClick={() => onOrderConfirm(order)}>Confirm Order</OrderButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalContainer>
      )}
    </Modal>
  );
};

export default OrderModal;
