import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookContainer, TableContainer } from "./styles";

interface SimplifiedBook {
  id: number;
  createdDate: string;
  publisher: string;
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  stockStatus: string;
  cover: string;
  categoryId: number;
  categoryName: string;
  customerReviewRank: number;
}
const columns = ["id", "createdDate", "publisher", "title", "author"];
const additionalColumns = [
  "pubDate",
  "isbn",
  "isbn13",
  "itemId",
  "priceSales",
  "priceStandard",
  "cover",
  "categoryId",
  "customerReviewRank",
];

const BookTable: React.FC = () => {
  // 여기에서 books를 상태로 선언합니다.
  const [books, setBooks] = useState<SimplifiedBook[]>([]);
  //검색
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<SimplifiedBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = searchTerm
    ? filteredBooks.slice(indexOfFirstItem, indexOfLastItem)
    : books.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/books");
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data[0]);
        setBooks(data); // books 상태 변경
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // 일부 데이터만 보여주는 함수
  const handleViewPart = () => {
    setViewAll(false);
  };

  // SimplifiedBook의 모든 데이터를 보여주는 페이지로 이동
  const handleViewAll = () => {
    setViewAll(true);
    // navigate("/book/detail");
  };

  // 추가, 수정, 삭제 함수 (아직 구현하지 않음)
  const handleAdd = () => {
    console.log("Add");
  };
  const handleEdit = (id: number) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
  };

  //페이지 이동
  const navigate = useNavigate();

  //특정 도서의 상세 페이지로 이동
  const handleClickItem = (id: number) => {
    navigate(`/book/detail/${id}`);
  };

  //검색
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const results = books.filter((book) =>
      Object.keys(book).some((key) => book[key].toString().toLowerCase().includes(searchTerm.toLowerCase())),
    );
    setFilteredBooks(results);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <BookContainer>
      <div>
        <div>
          <button onClick={handleViewAll}>전체보기</button>
          <button onClick={handleViewPart}>일부보기</button>
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
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= books.length}>
            Next
          </button>
        </div>
      </div>
    </BookContainer>
  );
};
export default BookTable;
