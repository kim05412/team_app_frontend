import { useState } from "react";
import Modal from "./modal";
import { FormContainer } from "../BookForm/styles";
import { ModifyContainer } from "./style";

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
        <ModifyContainer>
          <p>도서정보 수정</p>
          <label>
            <span>출판사:</span>
            <input
              type="text"
              value={editedBook.publisher}
              onChange={(e) => handleChange("publisher", e.target.value)}
            />
          </label>
          <label>
            <span>제목 :</span>
            <input type="text" value={editedBook.title} onChange={(e) => handleChange("title", e.target.value)} />
          </label>
          <label>
            <span>저자 :</span>
            <input type="text" value={editedBook.author} onChange={(e) => handleChange("author", e.target.value)} />
          </label>
          <label>
            <span>카테고리 :</span>
            <input
              type="text"
              value={editedBook.categoryName}
              onChange={(e) => handleChange("categoryName", e.target.value)}
            />
          </label>
          <label>
            <span>isbn :</span>
            <input type="text" value={editedBook.isbn} onChange={(e) => handleChange("isbn", e.target.value)} />
          </label>
          <label>
            <span>isbn13 :</span>
            <input type="text" value={editedBook.isbn13} onChange={(e) => handleChange("isbn13", e.target.value)} />
          </label>
          <label>
            <span>표지 :</span>
            <input type="text" value={editedBook.cover} onChange={(e) => handleChange("cover", e.target.value)} />
          </label>
          <label>
            <span>책 설명 :</span>
            <textarea value={editedBook.description} onChange={(e) => handleChange("description", e.target.value)} />
          </label>
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>닫기</button>
        </ModifyContainer>
      </div>
    </Modal>
  );
};

export default UpdateModal;
