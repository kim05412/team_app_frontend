import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  InventoryTable,
  InventoryTableHeader,
  InventoryTableBody,
  TableHeader,
  TableData,
  InventoryImage,
} from "../Inventory/inventory.style";

const PublisherBooks = () => {
  const { publisherName } = useParams();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/publishers/search?publisher=${publisherName}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      console.error("Error details:", error.response.data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [publisherName]);

  return (
    <div>
      <h1>Books by {publisherName}</h1>
      <InventoryTable>
        <InventoryTableHeader>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>출판사</TableHeader>
            <TableHeader>제목</TableHeader>
            <TableHeader>링크</TableHeader>
            <TableHeader>글쓴이</TableHeader>
            <TableHeader>출판일</TableHeader>
            <TableHeader>ISBN</TableHeader>
            <TableHeader>ISBN13</TableHeader>
            <TableHeader>ItemId</TableHeader>
            <TableHeader>CategoryId</TableHeader>
            <TableHeader>할인가</TableHeader>
            <TableHeader>정가</TableHeader>
            <TableHeader>재고량</TableHeader>
            <TableHeader>표지</TableHeader>
          </tr>
        </InventoryTableHeader>
        <InventoryTableBody>
          {books &&
            books.map((item, index) => (
              <tr key={item.id}>
                <TableData>{item.id}</TableData>
                <TableData>{item.publisher}</TableData>
                <TableData>{item.title}</TableData>
                <TableData>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    링크
                  </a>
                </TableData>
                <TableData>{item.author}</TableData>
                <TableData>{item.pubDate}</TableData>
                <TableData>{item.isbn}</TableData>
                <TableData>{item.isbn13}</TableData>
                <TableData>{item.itemId}</TableData>
                <TableData>{item.categoryId}</TableData>
                <TableData>{item.priceSales}</TableData>
                <TableData>{item.priceStandard}</TableData>
                <TableData>{item.stockStatus}</TableData>
                <TableData>
                  <InventoryImage src={item.cover} alt="cover" />
                </TableData>
              </tr>
            ))}
        </InventoryTableBody>
      </InventoryTable>
    </div>
  );
};

export default PublisherBooks;
