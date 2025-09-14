// Map a user's role to their default home route
export const getHomeRouteForRole = (role) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "manager":
      return "/manager";
    case "staff":
      return "/staff";
    default:
      return "/";
  }
};
