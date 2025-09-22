import useNotificationStore from "../store/notificationStore";

let eventSource = null;
let retryTimeout = null;

// Prefer explicit env; else try common dev ports in order
const explicit = import.meta.env.VITE_API_BASE_URL;
let API_BASE = explicit;
if (!API_BASE) {
  const candidates = [
    `${window.location.protocol}//${window.location.hostname}:5000`,
    `${window.location.protocol}//${window.location.hostname}:8000`,
    window.location.origin,
  ];
  API_BASE = candidates[0];
  console.log(
    "[Notifications] No VITE_API_BASE_URL set. Using fallback order:",
    candidates,
    "Selected:",
    API_BASE
  );
}

export function startNotificationStream() {
  if (eventSource) return; // already started

  const url = `${API_BASE}/api/notifications/stream`;
  console.log("[Notifications] Connecting to", url);
  try {
    eventSource = new EventSource(url, { withCredentials: true });
  } catch (e) {
    console.error("[Notifications] Failed to create EventSource", e);
    scheduleReconnect();
    return;
  }

  eventSource.onopen = () => {
    console.log("[Notifications] SSE connection opened");
  };

  eventSource.onmessage = (e) => {
    console.debug("[Notifications] Raw SSE message:", e.data);
    try {
      if (!e.data) return;
      let data;
      try {
        data = JSON.parse(e.data);
      } catch (jsonErr) {
        // treat as plain text message
        data = { message: e.data };
      }
      const state = useNotificationStore.getState();
      state.addNotification({
        message: data.message || data.text || JSON.stringify(data),
        title: data.title || "Notification",
        type: data.type || "info",
        createdAt: data.createdAt || new Date().toISOString(),
      });
    } catch (err) {
      console.error("[Notifications] Failed to parse message", err, e.data);
    }
  };

  eventSource.onerror = (err) => {
    console.error("[Notifications] SSE error - closing & retrying in 3s", err);
    cleanup();
    scheduleReconnect();
  };
}

function scheduleReconnect() {
  if (retryTimeout) return;
  retryTimeout = setTimeout(() => {
    retryTimeout = null;
    startNotificationStream();
  }, 3000);
}

export function cleanup() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
}

export function initNotifications() {
  startNotificationStream();
  window.addEventListener("beforeunload", cleanup);
}
