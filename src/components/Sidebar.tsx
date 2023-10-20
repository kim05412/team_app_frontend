import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 20px;
  }
  margin-left: 13px;
  margin-top: 20px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/books">BookList</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/merchandiser">Md</Link>
        </li>
        <li>
          <Link to="/publishers">Publishers</Link>
        </li>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
