import Main from "@/pages/Home/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "@/modules/admin/routes";
import { managerRoutes } from "@/modules/manager/routes";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        {adminRoutes}
        {/* 장바구니/주문 Route */}
        {managerRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
