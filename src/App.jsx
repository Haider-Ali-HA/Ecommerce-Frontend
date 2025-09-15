import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import VerifyTokenModal from "./components/modal/VerifyTokenModal";
import ForgotPasswordModal from "./components/modal/ForgotPasswordModal";
import StaffHome from "./pages/staff/StaffHome";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ResetPasswordModal from "./components/modal/ResetPasswordModal";
import AddManager from "./pages/admin/managers/AddManager";
import UpdateManager from "./pages/admin/managers/UpdateManager";
import AllManagers from "./pages/admin/managers/AllManagers";

const App = () => {
  const location = useLocation();
  const showFooter = location.pathname !== "/reset-password";
  return (
    <div>
      <Navbar />
      <div className="absolute top-0 left-0 w-full">
        <Routes>
          {/* auth modals are rendered at root; routes removed */}
          <Route path="/reset-password" element={<ResetPasswordModal />} />
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />

          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="products">
              <Route path="add" element={<AddProduct />} />
              <Route path="update" element={<UpdateProduct />} />
            </Route>
            <Route path="managers">
              <Route path="add" element={<AddManager />} />
              <Route path="update" element={<UpdateManager />} />

              <Route path="" element={<AllManagers />} />
            </Route>
          </Route>

          {/* manager routes */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ManagerHome />} />
          </Route>
          {/* staff routes  */}

          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <StaffHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {showFooter && <Footer />}

      {/* Mount modals so they are available globally */}
      <LoginModal id="login_modal" />
      <RegisterModal id="register_modal" />
      <VerifyTokenModal id="verify_token_modal" />
      <ForgotPasswordModal id="forgot_password_modal" />
    </div>
  );
};

export default App;
