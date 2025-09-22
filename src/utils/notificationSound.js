let baseAudio = null;

export function playNotificationSound() {
  try {
    if (!baseAudio) {
      baseAudio = new Audio("/sounds/notificationSound.mp3");
      baseAudio.preload = "auto";
    }
    const a = baseAudio.cloneNode();
    const p = a.play();
    if (p?.catch) {
      p.catch((err) => {
        if (!/NotAllowedError|interrupted/i.test(err?.message)) {
          console.warn(
            "[Notifications] Audio play blocked:",
            err?.message || err
          );
        }
      });
    }
  } catch (e) {
    console.warn("[Notifications] Failed to play sound", e);
  }
}
