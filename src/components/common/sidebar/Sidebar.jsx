import React, { useState } from "react";
import { SIDEBAR_ITEMS } from "../../../constants/sidebarConstants";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";

const Sidebar = () => {
  const [openMobile, setOpenMobile] = useState(false);

  const handleNavigate = () => {
    // Close on mobile after navigation
    setOpenMobile(false);
  };

  return (
    <aside className="bg-base-100 border-r border-base-300 h-dvh">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between border-b border-base-300 bg-base-100 px-4 py-3">
        <span className="text-base font-semibold">Admin Menu</span>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => setOpenMobile((v) => !v)}
          aria-expanded={openMobile}
          aria-controls="sidebar-menu"
        >
          ☰
        </button>
      </div>

      <nav
        id="sidebar-menu"
        className={`px-3 py-4 ${openMobile ? "block" : "hidden"} lg:block`}
        aria-label="Sidebar"
      >
        <ul className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <React.Fragment key={item.key}>
              {item.children ? (
                <SidebarDropdown item={item} onNavigate={handleNavigate} />
              ) : (
                <SidebarItem item={item} onNavigate={handleNavigate} />
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
