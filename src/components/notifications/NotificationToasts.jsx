import React, { useEffect, useRef } from "react";
import useNotificationStore from "../../store/notificationStore";
import { X } from "lucide-react";

// Unified toast background (bg-secondary). Type only affects progress bar color.
const progressColors = {
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const NotificationToast = ({ toast, onClose, autoCloseMs = 5000 }) => {
  const timerRef = useRef(null);
  const remainingRef = useRef(autoCloseMs);
  const lastStartRef = useRef(Date.now());

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, []);

  const startTimer = () => {
    lastStartRef.current = Date.now();
    timerRef.current = setTimeout(
      () => onClose(toast.id),
      remainingRef.current
    );
  };

  const pauseTimer = () => {
    clearTimeout(timerRef.current);
    remainingRef.current -= Date.now() - lastStartRef.current;
  };

  const resumeTimer = () => {
    startTimer();
  };

  return (
    <div
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      className={`w-80 text-text-primary rounded-md shadow-xl ring-1 ring-black/5 border border-black/5 px-4 py-3 flex flex-col gap-1 animate-slide-in pointer-events-auto bg-secondary/95 backdrop-blur-sm`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">
            {toast.title || "Notification"}
          </p>
          <p className="text-xs leading-snug whitespace-pre-wrap break-words">
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => onClose(toast.id)}
          className="text-text-primary/80 hover:text-text-accent inline-flex"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <ProgressBar duration={autoCloseMs} type={toast.type} />
    </div>
  );
};
const ProgressBar = ({ duration, type }) => {
  const barColor = progressColors[type] || progressColors.info;
  return (
    <div className="h-1 w-full bg-secondary/20 rounded overflow-hidden">
      <div
        className={`h-full ${barColor} animate-progress`}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};

const NotificationToasts = () => {
  const toasts = useNotificationStore((s) => s.toasts);
  const removeToast = useNotificationStore((s) => s.removeToast);

  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-3 max-h-screen pointer-events-none">
      {toasts.map((t) => (
        <NotificationToast key={t.id} toast={t} onClose={removeToast} />
      ))}
    </div>
  );
};

export default NotificationToasts;
