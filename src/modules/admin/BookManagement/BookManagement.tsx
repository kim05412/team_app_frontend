// import { addBook, deleteBook, getCachedBooks } from "../book/BookTable";

import BookTable from "../book/BookTable";
import { HeaderContainer } from "@/components/Header";

const BookManagement = () => {
  return (
    <div>
      <HeaderContainer>
        <p className="styledParagraph">도서 관리자 페이지</p>
      </HeaderContainer>
      <BookTable />
    </div>
  );
};

export default BookManagement;
