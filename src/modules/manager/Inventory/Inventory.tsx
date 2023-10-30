import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import Modal from "./modal";
import {
  EditDeleteButton,
  Footer,
  InventoryImage,
  InventoryPage,
  InventoryTable,
  InventoryTableBody,
  InventoryTableHeader,
  Overlay,
  SearchButton,
  SearchInput,
  TableData,
  TableHeader,
} from "./inventory.style";

const inventoryApi = axios.create({
  baseURL: "http://localhost:8082",
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
      setPage(1);
    }
  }, [location]);

  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pageData = useInventoryDataPaged(page, searchTerm);

  const changePageAndPushHistory = (newPage) => {
    setPage(newPage);
    navigate(`?page=${newPage}&search=${searchTerm}`);
    window.scrollTo(0, 0);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

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
      window.location.reload();
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
        window.location.reload();
      } catch (e) {
        console.error("Item delete error:", e);
      }
    }
  };

  const sendDataToRedis = async () => {
    for (const item of pageData.content) {
      const { itemId, stockStatus } = item;

      try {
        const response = await inventoryApi.post("/api/send-to-redis", { itemId, stockStatus });
        console.log(`Data sent to Redis: ${response.data}`);
      } catch (error) {
        console.error(`Error sending data to Redis for item ${itemId}: ${error}`);
      }
    }

    alert("저장되었습니다!");
  };

  return (
    <InventoryPage>
      <h1>Inventory Page</h1>
      <SearchInput
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="제목검색"
      />
      <SearchButton onClick={executeSearch}>검색</SearchButton>
      <InventoryTable>
        <InventoryTableHeader>
          <tr>
            <TableHeader>선택</TableHeader>
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
          {pageData &&
            pageData.content.map((item, index) => (
              <tr key={item.id}>
                <TableData>
                  <input
                    type="checkbox"
                    checked={item.id === selectedRowId}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </TableData>
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

      <EditDeleteButton onClick={handleOpenModal} disabled={!selectedRowId}>
        수정
      </EditDeleteButton>

      <EditDeleteButton onClick={handleDelete} disabled={!selectedRowId}>
        삭제
      </EditDeleteButton>
      <EditDeleteButton onClick={sendDataToRedis}>저장</EditDeleteButton>

      {isModalOpen && (
        <>
          <Overlay></Overlay>

          <Modal
            rowData={pageData.content.find((item) => item.id === selectedRowId)}
            onClose={handleCloseModal}
            onSave={handleSaveModal}
          />
        </>
      )}

      <Footer>
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
      </Footer>
    </InventoryPage>
  );
};

export default InventoryComponent;
