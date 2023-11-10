import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  StatisticsPage,
  StatisticsTable,
  StatisticsTableHeader,
  StatisticsTableBody,
  TableData,
  TableHeader,
} from "./statistics.style";

interface RedisData {
  itemId: string;
  stockStatus: string;
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
      setData(response.data.sort((a, b) => a.itemId.localeCompare(b.itemId)));
    } catch (error) {
      console.error("Error fetching Redis data:", error);
    }
  };

  return (
    <StatisticsPage>
      <h1>Redis Statistics</h1>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        customInput={<CustomInput />}
      />
      <StatisticsTable>
        <StatisticsTableHeader>
          <tr>
            <TableHeader>Item ID</TableHeader>
            <TableHeader>Current Stock Status</TableHeader>
            <TableHeader>Increase</TableHeader>
            <TableHeader>Decrease</TableHeader>
          </tr>
        </StatisticsTableHeader>
        <StatisticsTableBody>
          {data.map((item, index) => (
            <tr key={index}>
              <TableData>{item.itemId}</TableData>
              <TableData>{item.stockStatus}</TableData>
              <TableData>{item.increase}</TableData>
              <TableData>{item.decrease}</TableData>
            </tr>
          ))}
        </StatisticsTableBody>
      </StatisticsTable>
    </StatisticsPage>
  );
};

export default Statistics;
