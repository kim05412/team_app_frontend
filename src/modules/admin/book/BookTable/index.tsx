import { useState, useEffect, MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BookContainer, ModalContainer, TableContainer } from "./styles";
import axios from "axios";
import { SimplifiedBook } from "../Book";
import BookForm from "../BookForm";
import Modal from "../BookForm/modal";

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

const BASE_URL = "http://localhost:8082/api/books";

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
  const currentBooks = searchTerm
    ? filteredBooks.slice(indexOfFirstItem, indexOfLastItem)
    : books.slice(indexOfFirstItem, indexOfLastItem);

  // 함수 정의

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/books/cache");
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleViewPart = () => {
    setViewAll(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const results = books.filter((book) =>
      Object.keys(book).some((key) => book[key].toString().toLowerCase().includes(searchTerm.toLowerCase())),
    );
    setFilteredBooks(results);
  };

  const handleClickItem = (id: number) => {
    navigate(`/book/detail/${id}`);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${bookId}`);
      return response.data;
    } catch (error) {
      console.error("책을 삭제하는 중에 오류가 발생했습니다", error);
      throw error;
    }
  };
  return (
    <div>
      BookTable 컴포넌트
      <BookContainer>
        <div>
          <div>
            <button onClick={handleViewAll}>전체보기</button>
            <button onClick={handleViewPart}>일부보기</button>
            <button onClick={handleAdd}>추가하기</button>
          </div>

          <div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Enter 키 눌렀을 때 검색
            />
            <button onClick={handleSearch}>검색</button>
          </div>

          {/* true일때 */}
          {/* {loading && <p>Loading...</p>} */}
          {/* false일때 table */}
          <TableContainer>
            <table>
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
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= books.length}>
              Next
            </button>
          </div>
        </div>
      </BookContainer>
      <div style={{ marginTop: "20px" }}>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <BookForm />
        </Modal>
      </div>
    </div>
  );
};

export default BookTable;
