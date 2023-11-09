import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PublisherPage,
  PublisherTable,
  PublisherTableHeader,
  PublisherTableBody,
  TableData,
  TableHeader,
  StyledLink,
} from "./publisher.style";

const Publisher = () => {
  const [publishers, setPublishers] = useState([]);

  const fetchPublishers = async () => {
    try {
      const response = await axios.get("http://localhost:8082/publishers");
      setPublishers(response.data);
    } catch (error) {
      console.error("Error fetching publishers:", error.message);
      console.error("Error details:", error.response.data);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  return (
    <PublisherPage>
      <h1>Publishers</h1>
      <PublisherTable>
        <PublisherTableHeader>
          <tr>
            <TableHeader>Publisher</TableHeader>
            <TableHeader>Number of Books</TableHeader>
          </tr>
        </PublisherTableHeader>
        <PublisherTableBody>
          {publishers.map((publisher, index) => (
            <tr key={index}>
              <TableData>
                <StyledLink to={`/publishers/${publisher.publisher}`}>{publisher.publisher}</StyledLink>
              </TableData>
              <TableData>{publisher.bookCount}</TableData>
            </tr>
          ))}
        </PublisherTableBody>
      </PublisherTable>
    </PublisherPage>
  );
};

export default Publisher;
