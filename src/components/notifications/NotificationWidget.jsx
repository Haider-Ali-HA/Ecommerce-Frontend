import React, { useEffect } from "react";
import useNotificationStore from "../../store/notificationStore";
import NotificationPanel from "./NotificationPanel";
import { initNotifications } from "../../services/notificationStream";
import { Bell } from "lucide-react";

const NotificationWidget = () => {
  // Use store selector so component re-renders when notifications change
  const isOpen = useNotificationStore((s) => s.isOpen);
  const toggleOpen = useNotificationStore((s) => s.toggleOpen);
  const unread = useNotificationStore((s) => s.unreadCount());

  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleOpen}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-success text-text-secondary shadow-lg hover:scale-105 transition"
          aria-label="Toggle notifications"
        >
          <Bell className="w-6 h-6" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 bg-error text-text-secondary text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>
      </div>
      {isOpen && <NotificationPanel />}
    </>
  );
};

export default NotificationWidget;
