import { useState } from "react";
import Modal from "./modal";

const UpdateModal = ({ book, isOpen, onClose, onSave }) => {
  const [editedBook, setEditedBook] = useState(book);

  const handleChange = (field, value) => {
    setEditedBook({ ...editedBook, [field]: value });
  };

  const handleSave = () => {
    onSave(editedBook);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <input type="text" value={editedBook.title} onChange={(e) => handleChange("title", e.target.value)} />
        <input type="text" value={editedBook.publisher} onChange={(e) => handleChange("publisher", e.target.value)} />
        <input type="text" value={editedBook.author} onChange={(e) => handleChange("author", e.target.value)} />
        <input type="text" value={editedBook.isbn} onChange={(e) => handleChange("isbn", e.target.value)} />
        <input type="text" value={editedBook.isbn13} onChange={(e) => handleChange("isbn13", e.target.value)} />
        <input
          type="text"
          value={editedBook.priceSales}
          onChange={(e) => handleChange("priceSales", Number(e.target.value))}
        />
        <input
          type="text"
          value={editedBook.priceStandard}
          onChange={(e) => handleChange("priceStandard", Number(e.target.value))}
        />
        <input
          type="text"
          value={editedBook.stockStatus}
          onChange={(e) => handleChange("stockStatus", e.target.value)}
        />
        <input type="text" value={editedBook.cover} onChange={(e) => handleChange("cover", e.target.value)} />
        <textarea value={editedBook.description} onChange={(e) => handleChange("description", e.target.value)} />
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </Modal>
  );
};

export default UpdateModal;
