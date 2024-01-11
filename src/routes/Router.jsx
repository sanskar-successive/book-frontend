// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Layout from "../pages/layout/Layout";
// import BookList from "../pages/bookList/BookList";
// import AddBook from "../pages/addBook/AddBook";
// import BookDetails from "../pages/bookDetails/BookDetails";
// import BulkUploadList from "../pages/bulkUpload/BulkUploadList";
// import BulkErrorDetail from "../pages/bulkErrorDetail/BulkErrorDetail";
// import UploadFile from "../components/uploadFile/UploadFile";
// import Login from "../pages/login/Login";
// import ProtectedRoutes from "../components/ProtectedRoutes";
// import NotFound from "../pages/notFound/NotFound";

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Layout />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route element={<ProtectedRoutes/>}>
//           <Route path="/" element={<BookList />} />
//           <Route path="/:bookId" element={<BookDetails />} />
//           <Route path="/add-book" element={<AddBook />} />
//           <Route path="/add-book/:bookId" element={<AddBook />} />
//           <Route path="/upload-file" element={<UploadFile />} />
//           <Route path="/bulk-uploads" element={<BulkUploadList />} />
//           <Route path="/bulk-uploads/:session_id" element={<BulkErrorDetail />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export default Router;


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import BookList from "../pages/bookList/BookList";
import AddBook from "../pages/addBook/AddBook";
import BookDetails from "../pages/bookDetails/BookDetails";
import BulkUploadList from "../pages/bulkUpload/BulkUploadList";
import BulkErrorDetail from "../pages/bulkErrorDetail/BulkErrorDetail";
import UploadFile from "../components/uploadFile/UploadFile";
import Login from "../pages/login/Login";
import ProtectedRoutes from "../components/ProtectedRoutes";
import NotFound from "../pages/notFound/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Layout /> */}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route exact path="/" element={<BookList />} />
            <Route exact path="book/:bookId" element={<BookDetails />} />
            <Route exact path="/add-book" element={<AddBook />} />
            <Route exact path="/add-book/:bookId" element={<AddBook />} />
            <Route exact path="/upload-file" element={<UploadFile />} />
            <Route exact path="/bulk-uploads" element={<BulkUploadList />} />
            <Route exact path="/bulk-uploads/:session_id" element={<BulkErrorDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;







