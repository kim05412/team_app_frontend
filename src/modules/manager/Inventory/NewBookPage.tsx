import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./modal";

function NewBookPage() {
  const [newBooks, setNewBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // 신간 도서 데이터를 가져오는 API 호출
    axios
      .get("http://localhost:8082/newBooks")
      .then((response) => {
        setNewBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleEditClick = (book) => {
    setSelectedBook(book);
  };

  const handleCreateClick = () => {
    setSelectedBook({
      id: "",
      publisher: "",
      title: "",
      link: "",
      author: "",
      pubDate: "",
      isbn: "",
      isbn13: "",
      itemId: "",
      categoryId: "",
      categoryName: "",
      priceSales: "",
      priceStandard: "",
      stockStatus: "",
      cover: "",
    });
  };

  const handleSave = (editedBook) => {
    // 수정된 도서 데이터를 저장하는 API 호출
    axios
      .post("http://localhost:8082/newBooks", editedBook)
      .then((response) => {
        console.log(response);
        setNewBooks((prevBooks) => [...prevBooks, response.data]); // 새 도서를 목록에 추가합니다.
        setSelectedBook(null); // 선택된 도서를 초기화합니다.
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <h1>New Books</h1>
      <button onClick={handleCreateClick}>Create</button> {/* '생성' 버튼을 추가합니다. */}
      {newBooks.map((book, index) => (
        <div key={index}>
          <h2>{book.title}</h2>
          <button onClick={() => handleEditClick(book)}>Edit</button>
          {/* 기타 도서 정보 표시 */}
        </div>
      ))}
      {selectedBook !== null && (
        <Modal rowData={selectedBook} onClose={() => setSelectedBook(null)} onSave={handleSave} />
      )}
    </div>
  );
}

export default NewBookPage;
