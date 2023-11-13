import { useState } from "react";
import { Overlay, ModalWrapper, FormItem } from "./modal.style";

const Modal = ({ rowData, onClose, onSave }) => {
  const [editedData, setEditedData] = useState(rowData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplyClick = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalWrapper>
        <h2>Edit Data</h2>
        <form>
          {Object.keys(rowData || {}).map(
            (key) =>
              key !== "id" && (
                <FormItem key={key}>
                  <label htmlFor={key}>{key}:</label>
                  <input type="text" id={key} name={key} value={editedData[key] || ""} onChange={handleChange} />
                </FormItem>
              ),
          )}

          <button type="button" onClick={handleApplyClick}>
            Apply
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </ModalWrapper>
    </>
  );
};

export default Modal;
