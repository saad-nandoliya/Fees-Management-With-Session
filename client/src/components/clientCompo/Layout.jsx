import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <main className="pb-1 flex-grow mt-1 " >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
