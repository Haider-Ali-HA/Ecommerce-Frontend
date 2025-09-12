// Centralized text labels and sidebar structure
// You can adjust labels here without touching components

export const NAV = {
  dashboard: "Dashboard",
  products: "Products",
  addProduct: "Add Product",
  updateProduct: "Update Product",
  orders: "Orders",
  customers: "Customers",
  settings: "Settings",
};

// Sidebar menu schema consumed by Sidebar component
// - key: stable identifier
// - label: from NAV constants above
// - to: route path (for leaf items)
// - children: array of items (for dropdowns)
export const SIDEBAR_ITEMS = [
  {
    key: "dashboard",
    label: NAV.dashboard,
    to: "/admin",
  },
  {
    key: "products",
    label: NAV.products,
    children: [
      { key: "add-product", label: NAV.addProduct, to: "/admin/products/add" },
      {
        key: "update-product",
        label: NAV.updateProduct,
        to: "/admin/products/update",
      },
    ],
  },
  // Example placeholders for future expansion
  // { key: "orders", label: NAV.orders, to: "/admin/orders" },
  // { key: "customers", label: NAV.customers, to: "/admin/customers" },
  // { key: "settings", label: NAV.settings, to: "/admin/settings" },
];
