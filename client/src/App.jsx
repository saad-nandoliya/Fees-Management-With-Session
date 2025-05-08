import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientRoutes from "./routes/clientRoutes/ClientRoute";


const App = () => {
  return (
    <>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<ClientRoutes />} />
            {/* <Route path="/admin/*" element={<DashboaedRoutes />} /> */}
          </Routes>
        </BrowserRouter>
      </>
    </>
  );
};

export default App;
