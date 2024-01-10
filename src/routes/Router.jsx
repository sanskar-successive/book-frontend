import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import BookList from "../pages/bookList/BookList";
import AddBook from "../pages/addBook/AddBook";
import BookDetails from "../pages/bookDetails/BookDetails";
import BulkUploadList from "../pages/bulkUpload/BulkUploadList";
import BulkErrorDetail from "../pages/bulkErrorDetail/BulkErrorDetail";
import UploadFile from "../components/uploadFile/UploadFile";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Unauthorised from "../pages/unauthorised/Unauthorised";
import ProtectedRoutes from "../components/ProtectedRoutes";
import NotFound from "../pages/notFound/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/unauthorised" element={<Unauthorised />} /> */}
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<BookList />} />
          <Route path="/:bookId" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/add-book/:bookId" element={<AddBook />} />
          <Route path="/upload-file" element={<UploadFile />} />
          <Route path="/bulk-uploads" element={<BulkUploadList />} />
          <Route path="/bulk-uploads/:session_id" element={<BulkErrorDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;



