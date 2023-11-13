import { Route } from "react-router-dom";
import Inventory from "./Inventory/Inventory";
import Publisher from "./Publisher/Publisher";
import Statistics from "./Statistics/Statistics";
import Order from "./ShopOrder/order";
import NewBookPage from "./Inventory/NewBookPage";

export const managerRoutes = (
  <>
    <Route path="inventory" element={<Inventory />} />
    <Route path="publishers" element={<Publisher />} />
    <Route path="statistics" element={<Statistics />} />
    <Route path="order" element={<Order />} />
    <Route path="newBooks" element={<NewBookPage />} />
  </>
);
