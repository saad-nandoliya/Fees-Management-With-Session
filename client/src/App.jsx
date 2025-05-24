import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientRoutes from "./routes/clientRoutes/ClientRoute";
import AdminRoutes from "./routes/adminRoutes/AdminRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";


const App = () => {
  return (
    <>

      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
        />
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>

    </>
  );
};

export default App;
