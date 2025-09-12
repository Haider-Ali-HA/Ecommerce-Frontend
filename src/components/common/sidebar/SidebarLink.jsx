import React from "react";
import { NavLink } from "react-router-dom";

// Basic link used by SidebarItem and Dropdown children
const SidebarLink = ({ to, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
          isActive
            ? "bg-base-300 text-base-content"
            : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
        }`
      }
      end
    >
      {label}
    </NavLink>
  );
};

export default SidebarLink;
