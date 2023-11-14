import { Route } from "react-router-dom";
import BookManagement from "./BookManagement/BookManagement";
import MerchandiserManagement from "./MerchandiserManagement";
import TodayBook from "./merchandiser/Today";

export const adminRoutes = (
  <>
    <Route path="books" element={<BookManagement />} />
    <Route path="merchandiser" element={<MerchandiserManagement />} />
    <Route path="merchandiser/today" element={<TodayBook />} />
  </>
);
