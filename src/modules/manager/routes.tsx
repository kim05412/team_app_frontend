import { Route } from "react-router-dom";
import Inventory from "./Inventory/Inventory";
import Publisher from "./Publisher/Publisher";
import Statistics from "./Statistics/Statistics";

export const managerRoutes = (
  <>
    <Route path="inventory" element={<Inventory />} />
    <Route path="publishers" element={<Publisher />} />
    <Route path="statistics" element={<Statistics />} />
  </>
);
