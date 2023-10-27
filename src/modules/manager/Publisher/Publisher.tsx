import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PublisherTable() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/publishers") // 백엔드에서 제공하는 API 주소를 입력하세요.
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Publisher</th>
          <th>Number of Books</th>
        </tr>
      </thead>
      <tbody>
        {publishers.map((publisher, index) => (
          <tr key={index}>
            <td>
              <Link to={`/publishers/${publisher.name}`}>{publisher.name}</Link>
            </td>
            <td>{publisher.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PublisherTable;
