import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

const inventoryApi = axios.create({
  baseURL: "http://localhost:8080",
});

interface InventoryData {
  id?: number;
  publisher: string;
  title: string;
  link: string;
  author: string;
  pubDate: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  categoryId: number;
  categoryName: string;
  priceSales: number;
  priceStandard: number;
  stockStatus: string;
  cover: string;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const PAGE_SIZE = 10;

const INIT_DATA: Page<InventoryData> = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: PAGE_SIZE,
};
const INVENTORY_DATA_KEY = "/api/inventories";

const inventoryFetcher = async (page, keyword) => {
  const params = { page: page - 1, size: PAGE_SIZE };
  if (keyword) params.keyword = keyword;

  try {
    const response = await inventoryApi.get<InventoryData[]>(`${INVENTORY_DATA_KEY}/paging/search`, { params });
    return response.data;
  } catch (e) {
    console.error("인벤토리 데이터 가져오기 에러:", e);
    return INIT_DATA;
  }
};

export const useInventoryDataPaged = (page, keyword) => {
  const { data: pageData = INIT_DATA, error } = useSWR<Page<InventoryData>>(
    [INVENTORY_DATA_KEY + "/paging/search", page, keyword],
    () => inventoryFetcher(page, keyword),
    {
      fallbackData: INIT_DATA,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (error) console.error("인벤토리 데이터 가져오기 에러:", error);

  return pageData;
};

const InventoryComponent = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromUrl = Number(queryParams.get("page"));
    if (pageFromUrl) {
      setPage(pageFromUrl);
    }
  }, [location]);

  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pageData = useInventoryDataPaged(page, searchTerm);

  const changePageAndPushHistory = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  const executeSearch = () => {
    setPage(1);
    setSearchTerm(keyword);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeSearch();
    }
  };

  return (
    <div>
      <h1>Inventory Page</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
      />
      <button onClick={executeSearch}>검색</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>출판사</th>
            <th>제목</th>
            <th>링크</th>
            <th>글쓴이</th>
            <th>출판일</th>
            <th>ISBN</th>
            <th>ISBN13</th>
            <th>ItemId</th>
            <th>CategoryId</th>
            <th>카테고리</th>
            <th>할인가</th>
            <th>정가</th>
            <th>재고량</th>
            <th>표지</th>
          </tr>
        </thead>

        <tbody>
          {pageData &&
            pageData.content.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.publisher}</td>
                <td>{item.title}</td>
                <td>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    [링크]
                  </a>
                </td>
                <td>{item.author}</td>
                <td>{item.pubDate}</td>
                <td>{item.isbn}</td>
                <td>{item.isbn13}</td>
                <td>{item.itemId}</td>
                <td>{item.categoryId}</td>
                <td>{item.categoryName}</td>
                <td>{item.priceSales}</td>
                <td>{item.priceStandard}</td>
                <td>{item.stockStatus}</td>
                <td>
                  <img src={item.cover} alt="cover" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <footer>
        <button onClick={() => changePageAndPushHistory(1)} disabled={page === 1}>
          First Page
        </button>

        <button onClick={() => changePageAndPushHistory((prevPage) => Math.max(prevPage - 1), 0)} disabled={page === 1}>
          Previous Page
        </button>

        {/* 페이지 번호를 표시하는 부분 */}
        {Array.from({ length: Math.min(pageData.totalPages, 5) }, (_, i) =>
          page <= 3 ? i + 1 : page >= pageData.totalPages - 2 ? pageData.totalPages - 4 + i : page - 2 + i,
        ).map((pageNum) => (
          <button key={pageNum} onClick={() => changePageAndPushHistory(pageNum)} disabled={page === pageNum}>
            {pageNum}
          </button>
        ))}

        <button
          onClick={() =>
            changePageAndPushHistory(
              (prevPage) =>
                prevPage +
                (page < pageData.totalPages
                  ? // 만약 현재 페이지가 마지막 페이지보다 작다면,
                    // 다음 페이지로 이동하도록 함.
                    prevPage + 1
                  : // 그렇지 않으면 현재 페이지 번호 유지.
                    prevPage),
            )
          }
          disabled={page >= pageData.totalPages}>
          Next Page
        </button>

        <button onClick={() => changePageAndPushHistory(pageData.totalPages)} disabled={page === pageData.totalPages}>
          Last Page
        </button>
      </footer>
    </div>
  );
};

export default InventoryComponent;
