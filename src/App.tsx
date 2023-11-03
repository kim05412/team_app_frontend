import Main from "@/pages/Home/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes } from "./modules/admin/routes";
import { managerRoutes } from "@/modules/manager/routes";
import Layout from "./layout/Layout";
import ResetStyle from "./styles/reset";
import PublisherBooks from "./modules/manager/Publisher/PublisherBooks";
import PublisherTable from "./modules/manager/Publisher/Publisher";

const App = () => {
  return (
    <BrowserRouter>
      <ResetStyle />

      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          {adminRoutes}
          {managerRoutes}
          <Route path="/publishers/:publisherName" element={<PublisherBooks />} />
          <Route path="/publishers" element={<PublisherTable />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
