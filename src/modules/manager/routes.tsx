import { Route } from "react-router-dom";
import Inventory from "./Inventory/Inventory";
import Publisher from "./Publisher/Publisher";

export const managerRoutes = (
  <>
    <Route path="inventory" element={<Inventory />} />
    <Route path="publisher" element={<Publisher />} />
    {/* 추가적인 manager 모듈 라우트 추가 */}
  </>
);
