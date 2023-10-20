import { Route } from "react-router-dom";
import BookManagement from "./BookManagement/BookManagement";
import Merchandiser from "./Merchandiser/Merchandiser";

export const adminRoutes = (
  <>
    <Route path="books" element={<BookManagement />} />
    <Route path="merchandiser" element={<Merchandiser />} />
  </>
);
