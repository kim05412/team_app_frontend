// PublisherBooks.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PublisherBooks() {
  const { publisherName } = useParams<{ publisherName: string }>();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/publishers/${publisherName}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [publisherName]);

  return (
    <div>
      <h1>{publisherName}의 책 목록</h1>
      {books.map((book, index) => (
        <div key={index}>
          <h2>ItemId: {book.itemId}</h2>
          <h2>Title: {book.title}</h2>
          <h2>ISBN: {book.isbn}</h2>
          <h2>Stock Status: {book.stockStatus}</h2>
        </div>
      ))}
    </div>
  );
}

export default PublisherBooks;
