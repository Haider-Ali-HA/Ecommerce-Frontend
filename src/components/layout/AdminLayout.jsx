import React from "react";
import SideBar from "../common/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <div className="lg:h-screen lg:sticky lg:top-0">
          <SideBar />
        </div>
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
