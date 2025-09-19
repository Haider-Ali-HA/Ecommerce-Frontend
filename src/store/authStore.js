import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () =>
        set({ user: null, isAuthenticated: false, isCheckingAuth: false }),
        setIsCheckingAuth: (flag) => set({ isCheckingAuth: flag }),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
    
  )
);

export default useAuthStore;
