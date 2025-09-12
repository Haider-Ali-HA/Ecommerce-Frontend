import React from "react";
import SidebarLink from "./SidebarLink";

const SidebarItem = ({ item, onNavigate }) => {
  if (!item?.to) return null;
  return (
    <li>
      <SidebarLink to={item.to} label={item.label} onClick={onNavigate} />
    </li>
  );
};

export default SidebarItem;
