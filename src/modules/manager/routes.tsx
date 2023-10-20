import { Route } from "react-router-dom";
import Inventory from "./Inventory/Inventory";
import Publisher from "./Publisher/Publisher";

export const managerRoutes = (
  <>
    <Route path="inventory" element={<Inventory />} />
    <Route path="publishers" element={<Publisher />} />
  </>
);
