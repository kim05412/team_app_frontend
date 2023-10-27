import { useState, useEffect, MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BookContainer, ModalContainer, TableContainer } from "./styles";
import axios from "axios";
import { BASE_URL, SimplifiedBook } from "../Book";
import BookForm from "../BookForm";
import Modal from "../BookForm/modal";
import BookSearch from "../BookSearch";
// import deleteBook from "../deleteBook";

const columns = ["id", "createdDate", "publisher", "title", "author"];
const additionalColumns = [
  "pubDate",
  "isbn",
  "isbn13",
  "itemId",
  "priceSales",
  "priceStandard",
  "cover",
  "categoryName",
  "customerReviewRank",
];

const BookTable = () => {
  // Read
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [viewAll, setViewAll] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<SimplifiedBook[]>([]);
  const [books, setBooks] = useState<SimplifiedBook[]>([]);
  // update
  const [updateData, setUpdateData] = useState(false);
  // filteredBooks 없으면 books
  const currentBooks = searchTerm
    ? filteredBooks.slice(indexOfFirstItem, indexOfLastItem)
    : books.slice(indexOfFirstItem, indexOfLastItem);

  // 함수 정의

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/books/cache");
        setBooks(response.data);
        console.log("1.서버에서 렌더링 요청 받음");
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, [updateData]);

  // ParentComponent
  const handleAdd = () => {
    setIsModalOpen(true);
  };
  // 서버로 전달
  const handleSaved = async (response) => {
    if (response) {
      console.log("데이터 성공적으로 추가됨.");
      setUpdateData((prev) => !prev);
      console.log("2.서버로 렌더링 요청 보냄");
    }
  };
  const handleDelete = async (itemId) => {
    const response = await deleteBook(itemId);
    if (response.data) {
      // 요청이 성공적으로 처리되었다면
      setUpdateData((prev) => !prev);
    }
  };

  const deleteBook = async (itemId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("책을 삭제하는 중에 오류가 발생했습니다", error);
      throw error;
    }
  };

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleViewPart = () => {
    setViewAll(false);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // // 1번
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     const searchResults = setSearchTerm(event.target.value);
  //     handleSearch(searchResults);
  //   }
  // };

  // const handleSearch = () => {
  //   const results = books.filter((book) =>
  //     Object.keys(book).some(
  //       (key) =>
  //         book[key] !== null &&
  //         book[key] !== undefined &&
  //         book[key].toString().toLowerCase().includes(searchTerm.toLowerCase()),
  //     ),
  //   );
  //   setFilteredBooks(results);
  // };

  //filteredBooks 상태를 업데이트
  const handleSearch = (filteredBooks) => {
    setFilteredBooks(filteredBooks);
  };

  const handleClickItem = (id: number) => {
    navigate(`/book/detail/${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <BookContainer>
        <div>
          <button onClick={handleViewAll}>전체보기</button>
          <button onClick={handleViewPart}>일부보기</button>
          <button onClick={handleAdd}>추가하기</button>
          <button onClick={handleDelete}>삭제하기</button>
        </div>

        <div>
          <BookSearch books={books} onSearch={handleSearch} />
        </div>

        {/* true일때 */}
        {/* {loading && <p>Loading...</p>} */}
        {/* false일때 table */}
        <TableContainer>
          <table style={{ overflowX: "auto" }}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                {/* 추가 */}
                {viewAll && additionalColumns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr
                  key={book.id}
                  onClick={() => {
                    handleClickItem(book.id);
                  }}>
                  {(viewAll ? columns.concat(additionalColumns) : columns).map((column) => (
                    <td key={column}>
                      {book[column] !== undefined ? (
                        <div style={{ minWidth: column === "title" || column === "author" ? "250px" : "auto" }}>
                          {typeof book[column] === "string" && searchTerm
                            ? book[column].split(new RegExp(`(${searchTerm})`, "gi")).map((part, index) =>
                                part.toLowerCase() === searchTerm.toLowerCase() ? (
                                  <span key={index} style={{ backgroundColor: "yellow" }}>
                                    {part}
                                  </span>
                                ) : (
                                  part
                                ),
                              )
                            : book[column]}
                        </div>
                      ) : (
                        <div style={{ textAlign: "center" }}>-</div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
        <div>
          {/* 페이징컨트롤 */}
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(Math.ceil(books.length / itemsPerPage))].map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} disabled={currentPage === index + 1}>
              {index + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= books.length}>
            Next
          </button>
        </div>
      </BookContainer>
      <div style={{ marginTop: "20px" }}>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {/* onAddBook이라는 prop으로 handleAddBook 함수를 전달 */}
          {/* BookForm 컴포넌트 내부에서 onAddBook-> handleAddBook() */}
          <BookForm onSave={handleSaved} onClose={handleCloseModal} />
        </Modal>
      </div>
    </div>
  );
};

export default BookTable;
