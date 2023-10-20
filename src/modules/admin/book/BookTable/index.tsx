import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// jsx스타일-css
const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  width: "100%",
  margin: "20px 0",
};

const thStyle: React.CSSProperties = {
  backgroundColor: "#f2f2f2",
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "12px",
};

const trStyle: React.CSSProperties = {
  backgroundColor: "#f9f9f9",
};

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

const BookTable: React.FC = () => {
  // 여기에서 books를 상태로 선언합니다.
  const [books, setBooks] = useState<SimplifiedBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

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
        setBooks(data); // 가정: API의 응답이 도서 배열
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //페이지 이동
  const navigate = useNavigate();

  //특정 ehtj의 상세 페이지로 이동
  const handleClickItem = (id: number) => {
    navigate(`/book/detail/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {/* true일때 */}
      {/* {loading && <p>Loading...</p>} */}
      {/* false일때 table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Created Date</th>
            <th style={thStyle}>Publisher</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Author</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr
              key={book.id}
              style={trStyle}
              onClick={() => {
                handleClickItem(book.id);
              }}>
              <td style={tdStyle}>{book.id}</td>
              <td style={tdStyle}>{book.createdDate}</td>
              <td style={tdStyle}>{book.publisher}</td>
              <td style={tdStyle}>{book.title}</td>
              <td style={tdStyle}>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* 페이징컨트롤 */}
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= books.length}>
          Next
        </button>
      </div>
    </div>
  );
};
export default BookTable;
