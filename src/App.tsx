import Main from "@/pages/Home/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "./modules/admin/routes";
// import { managerRoutes } from "@/modules/manager/routes";
import Layout from "./layout/Layout";
import ResetStyle from "./styles/reset";

const App = () => {
  return (
    <BrowserRouter>
      <ResetStyle />

      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          {adminRoutes}
          {/* {managerRoutes} */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
