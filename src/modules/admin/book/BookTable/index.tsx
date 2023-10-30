import { useState, useEffect, MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookContainer,
  Button,
  ButtonContainer,
  ButtonGroup,
  Input,
  ModalContainer,
  PageContainer,
  SearchContainer,
  Select,
  TableContainer,
} from "./styles";
import axios from "axios";
import { BASE_URL, SimplifiedBook } from "../Book";
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

const BookTable = () => {
  // Read
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    // split: string만 가능 // gi:전체,대소문자 구분X
    // 검색어를 기준으로 나뉨 -> index 부여됨.
    // 검색어 해당되는 part =1개->0,1,2
    return text.split(new RegExp(`(${searchTerm})`, "gi")).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
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

  //선택
  const [isEditing, setIsEditing] = useState(false);
  // selectedBooks는 숫자 타입의 배열을 저장하는 상태 변수
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  //수정
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState<SimplifiedBook>({} as SimplifiedBook);

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

  //검색 옵션 변경
  const handleSearchOption = (event) => {
    setSearchOption(event.target.value);
  };
  // 검색 dropdown
  const handleSearchBtn = () => {
    const results = books.filter((book) =>
      searchOption === ""
        ? Object.values(book).some(
            (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : book[searchOption] && book[searchOption].toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredBooks(results);
  };

  // 조회
  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleViewPart = () => {
    setViewAll(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const handleClickItem = (id: number) => {
  //   navigate(`/book/detail/${id}`);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyPresSearch = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 눌렀을 때 handleSearch 함수를 호출합니다.
      handleSearchBtn();
    }
  };
  //선택
  const handleEditBtnClick = () => {
    setIsEditing(!isEditing);
  };
  //  책을 선택 or 선택 취소 시 호출
  const handleSelectBook = (itemId) => {
    // 이미 선택된 책 존재. :취소 호출
    if (selectedBooks.includes(itemId)) {
      // filter: 배열의 각 요소에 대해 주어진 함수를 실행하고, 그 함수가 true를 반환하는 요소들로 새로운 배열을 만들어 반환
      // filter:itemId가 아닌 다른 요소만 새로운 배열로 상태(SelectedBooks)를 업데이트
      // id는 selectedBooks 배열의 각 요소를 나타내는 임시 변수
      setSelectedBooks(selectedBooks.filter((id) => id !== itemId));
      // itemId와 일치하지 않는 상태들의 집합(update) == 일치하는 것들은 선택 취소
    } else {
      //책 선택 호출
      //...selectedBooks, itemId : selectedBooks가 itemId를 요소로 가지는 배열.
      setSelectedBooks([...selectedBooks, itemId]);
    }
  };

  //삭제
  const deleteBook = async (itemId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("책을 삭제하는 중에 오류가 발생했습니다", error);
      throw error;
    }
  };
  const handleDelete = async () => {
    if (isEditing && selectedBooks.length > 0) {
      const confirmDelete = window.confirm(`총 ${selectedBooks.length}개의 데이터를 삭제하시겠습니까?`);
      if (confirmDelete) {
        try {
          const responses = await Promise.all(selectedBooks.map((itemId) => deleteBook(itemId)));
          if (responses.every((response) => response)) {
            setUpdateData((prev) => !prev);
            setSelectedBooks([]);
          }
        } catch (error) {
          console.error("삭제 처리 중 오류가 발생했습니다", error);
        }
      }
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await handleDelete();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, selectedBooks]);

  //수정

  const handleUpdateBook = async (itemId, updatedData) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${itemId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("책을 수정하는 중에 오류가 발생했습니다", error);
      throw error;
    }
  };

  const handleEditClick = (book: SimplifiedBook) => {
    setFormData(book);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveClick = async () => {
    try {
      const response = await handleUpdateBook(editingBook.itemId, formData);
      if (response) {
        setUpdateData((prev) => !prev); // 데이터가 수정되었으므로 updateData 상태를 바꿔줌
        setEditingBook(null);
      }
    } catch (error) {
      console.error("수정 처리 중 오류가 발생했습니다", error);
    }
  };

  return (
    <div>
      <BookContainer>
        <SearchContainer>
          <Select value={searchOption} onChange={handleSearchOption}>
            <option value="">전체</option>
            <option value="title">제목</option>
            <option value="author">저자</option>
            <option value="publisher">출판사</option>
          </Select>
          <Input value={searchTerm} onChange={handleChange} onKeyPress={handleKeyPresSearch} placeholder="검색..." />
          <Button onClick={handleSearchBtn}>검색</Button>
        </SearchContainer>
        <PageContainer>
          <ButtonContainer>
            <ButtonGroup>
              <Button onClick={handleViewAll}>전체보기</Button>
              <Button onClick={handleViewPart}>일부보기</Button>
              <Button onClick={handleAdd}>추가하기</Button>
              <div>
                {isEditing && (
                  <Button onClick={handleDelete} onKeyPress={handleKeyDown}>
                    삭제하기
                  </Button>
                )}
                <Button onClick={handleEditBtnClick}>{isEditing ? "편집취소" : "편집하기"}</Button>
              </div>
            </ButtonGroup>
          </ButtonContainer>
        </PageContainer>

        {/* true일때 */}
        {/* {loading && <p>Loading...</p>} */}
        {/* false일때 table */}
        <TableContainer>
          <table style={{ overflowX: "auto" }}>
            <thead>
              <tr>
                {isEditing && <th>선택</th>}
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                {/* 추가 */}
                {viewAll && additionalColumns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.id}>
                  {isEditing && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleSelectBook(book.id)}
                      />
                    </td>
                  )}
                  {isEditing && (
                    <td>
                      <Button onClick={() => handleEditClick(book)}>수정하기</Button>
                    </td>
                  )}
                  {(viewAll ? columns.concat(additionalColumns) : columns).map((column) => (
                    <td key={column}>
                      {book[column] !== undefined ? (
                        <div
                          style={{
                            minWidth:
                              column === "" || column === "title" || column === "author" || column === "publisher"
                                ? "250px"
                                : "auto",
                          }}>
                          {/* 문자열 */}
                          {typeof book[column] === "string" &&
                          searchTerm &&
                          (searchOption === "" || searchOption === column)
                            ? highlightSearchTerm(book[column], searchTerm)
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
        {editingBook && (
          <div>
            <h3>책 정보 수정</h3>
            <form>
              <div>
                <label htmlFor="title">제목: </label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleFormChange} />
              </div>
              <div>
                <label htmlFor="author">저자: </label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleFormChange} />
              </div>
              <div>
                <label htmlFor="publisher">출판사: </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label htmlFor="priceSales">판매가: </label>
                <input
                  type="number"
                  id="priceSales"
                  name="priceSales"
                  value={formData.priceSales}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label htmlFor="priceStandard">정가: </label>
                <input
                  type="number"
                  id="priceStandard"
                  name="priceStandard"
                  value={formData.priceStandard}
                  onChange={handleFormChange}
                />
              </div>
              <Button onClick={handleSaveClick}>저장하기</Button>
            </form>
          </div>
        )}
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
