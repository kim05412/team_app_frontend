import BookForm from "../book/BookForm";
import BookTable from "../book/BookTable";

// import { addBook, deleteBook, getCachedBooks } from "../book/BookTable";

const BookManagement = () => {
  return (
    <div>
      <h1>도서 관리자 페이지</h1>
      <BookTable />
    </div>
  );
};

export default BookManagement;
