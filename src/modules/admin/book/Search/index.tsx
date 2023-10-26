import { useState } from "react";
import { SimplifiedBook } from "../Book";

interface Props {
  books: SimplifiedBook[];
  onSearch: (filteredBooks: SimplifiedBook[]) => void;
}

const BookSearch: React.FC<Props> = ({ books, onSearch }) => {
  const [searchField, setSearchField] = useState<string>(""); //필드
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어
  const [filteredBooks, setFilteredBooks] = useState<SimplifiedBook[]>([]); //검색 결과

  const handleSearch = () => {
    let results;
    if (searchField === "") {
      // 모든 필드에 대해 검색
      // 타입캐스팅
      //SimplifiedBook 인터페이스의 모든 키들의 유니언 타입을 반환
      results = books.filter((book) =>
        Object.keys(book).some(
          (key) =>
            book[key] !== null &&
            book[key] !== undefined &&
            book[key].toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      // 특정 필드에 대해 검색
      results = books.filter((book) =>
        book[searchField as keyof SimplifiedBook].toString().toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    onSearch(results); // 검색 결과를 부모 컴포넌트로 전달
  };

  return (
    <div>
      <div>
        <select onChange={(e) => setSearchField(e.target.value)} value={searchField}>
          <option value="">전체</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>{book.title}</li> // 여기에 원하는 정보를 추가해서 표시하면 됩니다.
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookSearch;
