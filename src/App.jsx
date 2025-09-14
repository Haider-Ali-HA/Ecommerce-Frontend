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
import VerifyTokenModal from "./components/modal/VerifyTokenModal";
import StaffHome from "./pages/staff/StaffHome";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* auth modals are rendered at root; routes removed */}
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
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route path="products">
            <Route
              path="add"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="update"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
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
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerHome />
              </ProtectedRoute>
            }
          />
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

      <Footer />
      {/* Mount modals so they are available globally */}
      <LoginModal id="login_modal" />
      <RegisterModal id="register_modal" />
      <VerifyTokenModal id="verify_token_modal" />
    </div>
  );
};

export default App;
