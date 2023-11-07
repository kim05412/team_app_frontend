import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PublisherTable() {
  const [publishers, setPublishers] = useState([]);
  const [newPublishers, setNewPublishers] = useState([]); // 추가된 부분

  useEffect(() => {
    axios
      .get("/api/publishers")
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    // 새로운 'publisher' 정보를 받아와 'newPublishers' 상태에 저장합니다.
    axios
      .get("/api/new-publishers")
      .then((response) => {
        setNewPublishers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching new publishers: ", error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Publisher</th>
          <th>Number of Books</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {publishers.map((publisher, index) => (
          <tr key={index}>
            <td>
              <Link to={`/publishers/${encodeURIComponent(publisher.name)}`}>{publisher.name}</Link>
            </td>
            <td>{publisher.count}</td>
            <td>
              {/* 'newPublishers' 배열에 현재 'publisher'가 있는지 확인하여 'NEW' 버튼을 표시하거나 숨깁니다. */}
              {newPublishers.includes(publisher.name) && (
                <Link to={`/newBookByPublisher/${encodeURIComponent(publisher.name)}`}>
                  <button>NEW</button>
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PublisherTable;
