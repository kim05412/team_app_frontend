import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../book/Book";

interface UserDTO {
  id: number;
  nickname?: string;
  birth?: number;
  gender?: number;
  bookmark?: string;
}

interface BookDTO {
  id: number;
  itemId: number;
  title: string;
  author: string;
  publisher: string;
  categoryName: string;
}

interface UserColumnViewsByBookAttribute {
  userColumnValue: number; // 사용자 속성 컬럼값
  bookAttributeKey: string; // 도서 속성의 키 (예: "title", "author", "publisher", "categoryName" 등)
  bookAttributeValue: string; // 도서 속성의 값
  totalViews: number; // 해당 속성을 가진 도서들의 총 조회수
}

const Merchdise: React.FC = () => {
  const [selectedUserColumn, setSelectedUserColumn] = useState<string>("");
  const [selectedBookAttribute, setSelectedBookAttribute] = useState<string>("");
  const [data, setData] = useState<UserColumnViewsByBookAttribute[]>([]);

  const fetchViewsData = async () => {
    try {
      const response = await axios.get<UserColumnViewsByBookAttribute[]>(`${BASE_URL}/view/user`, {
        params: {
          userColumn: selectedUserColumn,
          bookAttribute: selectedBookAttribute,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  return (
    <div>
      <label>
        Select User Attribute:
        <select value={selectedUserColumn} onChange={(e) => setSelectedUserColumn(e.target.value)}>
          <option value="gender">Gender</option>
          <option value="birth">Birth Year</option>
          {/* Add other user attributes as needed */}
        </select>
      </label>

      <label>
        Select Book Attribute:
        <select value={selectedBookAttribute} onChange={(e) => setSelectedBookAttribute(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          {/* Add other book attributes as needed */}
        </select>
      </label>

      <button onClick={fetchViewsData}>Fetch Data</button>

      {/* Display data */}
      {data && (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.userColumnValue} - {item.bookAttributeValue} : {item.totalViews} views
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Merchdise;
