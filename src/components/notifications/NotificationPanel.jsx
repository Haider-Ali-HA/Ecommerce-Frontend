import React from "react";
import useNotificationStore from "../../store/notificationStore";
import { no } from "zod/v4/locales";
import {
  Check,
  CheckCheck,
  Circle,
  Cross,
  CrossIcon,
  Dot,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

function timeAgo(ts) {
  try {
    const date = new Date(ts);
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleString();
  } catch {
    return ts;
  }
}

const NotificationPanel = () => {
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const clearNotifications = useNotificationStore((s) => s.clearNotifications);
  const close = useNotificationStore((s) => s.close);
  const soundEnabled = useNotificationStore((s) => s.soundEnabled);
  const toggleSound = useNotificationStore((s) => s.toggleSound);

  return (
    <div className="fixed bottom-20 right-4 w-80 max-h-[70vh] bg-secondary shadow-xl rounded-lg  flex flex-col overflow-hidden z-50">
      <div className="flex items-center justify-between px-3 py-2  border-b border-accent/60 flex-col gap-3">
        <div className="text-text-primary text-sm flex items-center gap-1 justify-between   w-full">
          <div className="flex items-center gap-1">
            <button
              onClick={toggleSound}
              className={`text-xs px-2 py-1 rounded  transition ${
                soundEnabled
                  ? " text-success hover:bg-success/40"
                  : " text-text-accent hover:bg-accent/40"
              }`}
              title={soundEnabled ? "Disable sound" : "Enable sound"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-5 h-5" />
                </>
              ) : (
                <>
                  <VolumeX className="w-5 h-5" />
                </>
              )}
            </button>
            <h3 className="font-semibold  ">Notifications </h3>
            <span className="text-text-accent"> ({notifications.length})</span>
          </div>
          <button
            onClick={close}
            className="text-xs text-text-accent hover:text-text-tertiary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-between w-full gap-2">
            <button
              onClick={markAllRead}
              className="text-xs text-success hover:underline"
            >
              Mark all read
            </button>
          <div className="flex gap-2">
            <button
              onClick={clearNotifications}
              className="text-xs text-text-accent hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto divide-y">
        {notifications.length === 0 && (
          <div className="p-4 text-center text-sm text-text-accent">
            No notifications yet
          </div>
        )}
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3 text-sm cursor-pointer hover:bg-neutral/40 ${
              n.read ? "opacity-70" : "bg-neutral"
            } transition`}
            onClick={() => markRead(n.id)}
          >
            <div className="flex justify-between gap-2">
              <span className="font-medium line-clamp-1 text-text-primary">
                {n.title}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-500 whitespace-nowrap">
                <CheckCheck
                  className={`w-3 h-3  ${
                    n.read ? "text-success" : "text-text-accent"
                  }`}
                  aria-label={n.read ? "Read" : "Unread"}
                />
                <span>{timeAgo(n.createdAt)}</span>
              </span>
            </div>
            <div className="text-gray-700 mt-0.5 text-xs whitespace-pre-wrap break-words">
              {n.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
