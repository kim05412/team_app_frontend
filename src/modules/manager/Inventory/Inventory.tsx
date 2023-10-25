import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import Modal from "./modal";

const inventoryApi = axios.create({
  baseURL: "http://localhost:8080",
});

interface InventoryData {
  cover: string;
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
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
}

const PAGE_SIZE = 10;

const INIT_DATA: Page<InventoryData> = {
  content: [],
  totalElements: 0,
  totalPages: 0,
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
    } else {
      // 페이지 번호가 없는 경우 기본적으로 1로 설정합니다.
      setPage(1);
    }
  }, [location]);

  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pageData = useInventoryDataPaged(page, searchTerm);

  const changePageAndPushHistory = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}&search=${searchTerm}`);
    window.scrollTo(0, 0); // 페이지 이동 후 스크롤을 최상단으로 이동
  };

  const executeSearch = () => {
    setPage(1);
    setSearchTerm(keyword);
    navigate(`?page=1&search=${keyword}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeSearch();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창이 열렸는지 여부
  const [selectedRowId, setSelectedRowId] = useState(null); // 선택된 행의 ID

  const handleCheckboxChange = (id) => {
    setSelectedRowId(id);
  };

  const handleOpenModal = () => {
    if (selectedRowId) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = async (editedItem) => {
    try {
      const response = await inventoryApi.put(`${INVENTORY_DATA_KEY}/${selectedRowId}`, editedItem);
      console.log("Updated Item:", response.data);
      window.location.reload(); // 페이지를 새로고침하여 데이터를 갱신합니다.
    } catch (e) {
      console.error("Item update error:", e);
    }
    handleCloseModal();
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      try {
        const response = await inventoryApi.delete(`${INVENTORY_DATA_KEY}/${selectedRowId}`);
        console.log("Deleted Item:", response.data);
        window.location.reload(); // 페이지를 새로고침하여 데이터를 갱신합니다.
      } catch (e) {
        console.error("Item delete error:", e);
      }
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
            <th>수정</th>
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
            <th>할인가</th>
            <th>정가</th>
            <th>재고량</th>
            <th>표지</th>
          </tr>
        </thead>

        <tbody>
          {pageData &&
            pageData.content.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.id === selectedRowId}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
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

      <button onClick={handleOpenModal} disabled={!selectedRowId}>
        수정
      </button>

      <button onClick={handleDelete} disabled={!selectedRowId}>
        삭제
      </button>

      {isModalOpen && (
        <>
          <div className="overlay"></div>

          <Modal
            rowData={pageData.content.find((item) => item.id === selectedRowId)}
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        </>
      )}

      <footer>
        <button onClick={() => changePageAndPushHistory(1)} disabled={page === 1}>
          First Page
        </button>

        <button onClick={() => changePageAndPushHistory(page - 1)} disabled={page === 1}>
          Previous Page
        </button>

        {Array.from({ length: Math.min(pageData.totalPages, 5) }, (_, i) =>
          page <= 3 ? i + 1 : page >= pageData.totalPages - 2 ? pageData.totalPages - 4 + i : page - 2 + i,
        ).map((pageNum) => (
          <button key={pageNum} onClick={() => changePageAndPushHistory(pageNum)} disabled={page === pageNum}>
            {pageNum}
          </button>
        ))}

        <button onClick={() => changePageAndPushHistory(page + 1)} disabled={page >= pageData.totalPages}>
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
