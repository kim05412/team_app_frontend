import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookContainer,
  Button,
  ButtonContainer,
  ButtonGroup,
  Input,
  PageContainer,
  SearchContainer,
  Select,
  TableContainer,
} from "./styles";
import axios from "axios";
import { BASE_URL, SimplifiedBook } from "../Book";
import BookForm from "../BookForm";
import Modal from "../BookForm/modal";
import UpdateModal from "../BookModify";
import UpModal from "../BookModify/modal";

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
  // const handleClose = () => {
  //   setIsUpdateModalOpen(false);
  // };
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentEditBook, setCurrentEditBook] = useState<SimplifiedBook | null>(null);

  // 함수 정의
  useEffect(() => {
    const getBooks = async () => {
      try {
        console.log(window.location.hostname);
        const response = await axios.get(`${BASE_URL()}/books/cache`, {
          params: {
            page: currentPage,
            size: itemsPerPage,
          },
        });
        setBooks(response.data);
        console.log("1.서버에서 렌더링 요청 받음");
        console.log("jenkins 자동화 테스트");
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
  // 추가 서버로 전달
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
  //수정
  //버튼-> 모달창 open
  const handleEditClick = (book: SimplifiedBook) => {
    setCurrentEditBook(book);
    setIsUpdateModalOpen(true);
  };

  const handleSaveEdit = (editedBook) => {
    // 서버에 수정 요청을 보냅니다.
    updateBookOnServer(editedBook).then((response) => {
      if (response) {
        // 토클 true/false -? false/true -> 데이터 변경 알림
        setUpdateData((prev) => !prev);
        alert("수정이 완료되었습니다.");

        // 여기에 서버에서 가져온 새로운 도서 목록으로 상태를 업데이트하는 코드를 추가합니다.
      } else {
        alert("수정에 실패했습니다.");
      }
    });
  };

  // 여러개 삭제 -> 리스트
  const deleteBook = async (selectedBooks) => {
    try {
      console.log(selectedBooks);
      // 각 책 객체에서 itemId만 추출
      // const itemIds = selectedBooks.map((book) => book.itemId);
      // console.log(itemIds);
      const response = await axios.delete(`${BASE_URL()}/books`, {
        params: {
          itemIds: selectedBooks.join(","),
        },
      });

      if (response.data && response.data.deletedBooks) {
        setUpdateData((prev) => !prev);
        alert(
          `총 ${response.data.deletedBooks.length}개의 도서정보가 성공적으로 삭제 되었습니다.${response.data.deletedBooks}`,
        );
        // alert(
        //   `총 ${
        //     response.data.deletedBooks.length
        //   }개의 도서정보가 성공적으로 삭제 되었습니다. 삭제된 도서 ID: ${response.data.deletedBooks.join(", ")}`,
        // );
        // alert("삭제 성공.");

        // 삭제된 도서를 상태에서 제거 -> 새로 고침 안하고 로컬에도 삭제 해줌
        // setBooks(currentBooks => currentBooks.filter(book => !response.data.deletedBooks.includes(book.itemId)));
      } else {
        alert("삭제된 도서정보가 없습니다.");
      }
    } catch (error) {
      console.error("책을 삭제하는 중에 오류가 발생했습니다", error);
      alert("삭제 처리 중 오류가 발생했습니다");
    }
  };
  const handleDelete = async () => {
    if (isEditing && selectedBooks.length > 0) {
      const confirmDelete = window.confirm(`총 ${selectedBooks.length}개의 데이터를 삭제하시겠습니까?`);
      if (confirmDelete) {
        try {
          // selectedBooks === itemIds
          deleteBook(selectedBooks);
          setSelectedBooks([]);
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

  // 서버 통신
  const updateBookOnServer = async (book) => {
    try {
      const response = await axios.put(`${BASE_URL()}/books/${book.itemId}`, book, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("서버에 도서 삭제를 업데이트하는데 실패했습니다.", error);
      throw error;
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
                  <Button onClick={handleDelete} onKeyPress={handleKeyDown} style={{ marginRight: "10px" }}>
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
                {isEditing && <th className="margin-right-10px">삭제</th>}
                {isEditing && <th>수정</th>}
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                {/* 여러개 선택 */}
                {viewAll && additionalColumns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.itemId}>
                  {isEditing && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.itemId)}
                        onChange={() => handleSelectBook(book.itemId)}
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

      {isUpdateModalOpen && (
        <UpModal isOpen={UpdateModal} onClose={handleCloseModal}>
          <UpdateModal
            book={currentEditBook}
            onSave={handleSaveEdit}
            onClose={() => setIsUpdateModalOpen(false)}
            isOpen={isUpdateModalOpen}
          />
        </UpModal>
      )}
    </div>
  );
};

export default BookTable;
