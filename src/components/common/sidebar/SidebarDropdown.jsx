import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const Chevron = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`h-4 w-4 transition-transform ${
      open ? "rotate-90" : "rotate-0"
    }`}
    aria-hidden
  >
    <path
      fillRule="evenodd"
      d="M6.293 7.293a1 1 0 011.414 0L12 11.586l-4.293 4.293a1 1 0 01-1.414-1.414L9.586 12 6.293 8.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const SidebarDropdown = ({ item, onNavigate }) => {
  const { pathname } = useLocation();
  const isAnyChildActive = useMemo(
    () => item.children?.some((c) => pathname.startsWith(c.to)),
    [pathname, item.children]
  );
  const [open, setOpen] = useState(isAnyChildActive);

  useEffect(() => {
    if (isAnyChildActive) setOpen(true);
  }, [isAnyChildActive]);

  if (!item?.children?.length) return null;

  return (
    <li>
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-base-content/80 hover:bg-base-200 hover:text-base-content`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`section-${item.key}`}
      >
        <span>{item.label}</span>
        <Chevron open={open} />
      </button>
      <div
        id={`section-${item.key}`}
        className={`overflow-hidden transition-[max-height] duration-200 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="mt-1 space-y-1 pl-3">
          {item.children.map((child) => (
            <li key={child.key}>
              <SidebarLink
                to={child.to}
                label={child.label}
                onClick={onNavigate}
              />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default SidebarDropdown;
