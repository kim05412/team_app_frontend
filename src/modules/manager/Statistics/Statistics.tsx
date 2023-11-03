import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface RedisData {
  itemId: string;
  stockStatus: string;
  previousStockStatus: string;
  increase: string;
  decrease: string;
}

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button onClick={onClick} ref={ref}>
    {value}
  </button>
));

const Statistics: React.FC = () => {
  const [data, setData] = useState<RedisData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchRedisData();
  }, [currentPage, selectedDate]);

  const fetchRedisData = async () => {
    try {
      const response = await axios.get("/api/redis-data", {
        params: {
          page: currentPage,
          pageSize: 20,
          date: selectedDate.toISOString().split("T")[0], // YYYY-MM-DD 형식으로 날짜를 변환합니다
        },
      });
      setData(response.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
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
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        customInput={<CustomInput />}
      />
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Previous Stock Status</th>
            <th>Current Stock Status</th>
            <th>Increase</th>
            <th>Decrease</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.itemId}</td>
              <td>{item.previousStockStatus}</td>
              <td>{item.stockStatus}</td>
              <td>{item.increase}</td>
              <td>{item.decrease}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
