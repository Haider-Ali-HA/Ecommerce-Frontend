import { create } from "zustand";
import { persist } from "zustand/middleware";
import { playNotificationSound } from "../utils/notificationSound";

// Shape of a notification: { id, title?, message, type, createdAt, read }

const MAX_NOTIFICATIONS = 200; // avoid unbounded growth

const useNotificationStore = create(
  persist(
    (set, get) => ({
      notifications: [],
      isOpen: false,
      toasts: [], // ephemeral, not persisted (filtered in partialize)
      soundEnabled: true,
      addNotification: (notif) => {
        const id = notif.id || crypto.randomUUID();
        const createdAt = notif.createdAt || new Date().toISOString();
        const n = { id, read: false, ...notif, createdAt };
        set((state) => {
          const list = [n, ...state.notifications].slice(0, MAX_NOTIFICATIONS);
          return { notifications: list };
        });
        // also create a toast unless explicitly disabled
        if (notif?.toast !== false) {
          get().addToast({
            id: "toast-" + id,
            title: n.title,
            message: n.message,
            type: n.type,
            createdAt,
          });
        }
      },
      // Toast helpers
      addToast: (toast) => {
        const id = toast.id || "toast-" + crypto.randomUUID();
        const t = { id, ...toast };
        set((state) => ({ toasts: [t, ...state.toasts].slice(0, 5) }));
        // Play sound ONLY on new toast creation
        if (get().soundEnabled) {
          playNotificationSound();
        }
      },
      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
      markRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearNotifications: () => set({ notifications: [] }),
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      unreadCount: () => get().notifications.filter((n) => !n.read).length,
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({
        notifications: state.notifications,
        isOpen: state.isOpen,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);

export default useNotificationStore;
