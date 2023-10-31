import { useState, useEffect } from "react";
import axios from "axios";

interface RedisData {
  itemId: string;
  stockStatus: string;
}

const Statistics: React.FC = () => {
  const [data, setData] = useState<RedisData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRedisData();
  }, [currentPage]);

  const fetchRedisData = async () => {
    try {
      const response = await axios.get("/api/redis-data", {
        params: {
          page: currentPage,
          pageSize: 20,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Redis data:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Redis Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Stock Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.stockStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default Statistics;
