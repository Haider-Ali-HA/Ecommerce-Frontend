import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import AdminLayout from "./components/layout/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/products/AddProduct";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import ManagerLayout from "./components/layout/ManagerLayout";
import ManagerHome from "./pages/manager/ManagerHome";
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* auth modals are rendered at root; routes removed */}
        <Route path="/" element={<LandingPage />} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="products">
            <Route path="add" element={<AddProduct />} />
            <Route path="update" element={<UpdateProduct />} />
          </Route>
        </Route>

        {/* manager routes */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerHome />} />
        </Route>
      </Routes>
      <Footer />
      {/* Mount modals so they are available globally */}
      <LoginModal id="login_modal" />
      <RegisterModal id="register_modal" />
    </div>
  );
};

export default App;
