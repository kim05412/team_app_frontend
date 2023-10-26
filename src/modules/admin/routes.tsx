import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookManagement from "./BookManagement/BookManagement";
import Merchandiser from "./Merchandiser/Merchandiser";
import BookForm from "./book/BookForm";
import BookDetail from "./book/BookDetail";

export const adminRoutes = (
  <>
    <Route path="books" element={<BookManagement />} />
    <Route path="merchandiser" element={<Merchandiser />} />
  </>
);
