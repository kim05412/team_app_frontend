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
          <Link to="/inventory">재고관리</Link>
        </li>
        <li>
          <Link to="/merchandiser">Md</Link>
        </li>
        <li>
          <Link to="/publishers">출판사관리</Link>
        </li>
        <li>
          <Link to="/statistics">재고변동</Link>
        </li>
        <li>
          <Link to="/order">주문확인</Link>
        </li>
        <li>
          <Link to="/newBooks">신간</Link>
        </li>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;
