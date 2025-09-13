import React, { useCallback, useEffect, useRef, useState } from "react";

// Custom modal component (replaces DaisyUI <dialog> usage)
// - Renders overlay + centered content
// - Closes on ESC and backdrop click
// - Exposes imperative .showModal() and .close() methods via the element's id
//   so existing calls like document.getElementById(id)?.showModal() continue to work.

const Modal = ({ id, children, onClose, onOpen, className = "" }) => {
  const [open, setOpen] = useState(false); // mounted state
  const [show, setShow] = useState(false); // animated visibility
  const containerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const ANIM_MS = 200; // keep in sync with duration classes below

  const closeAnimated = useCallback(() => {
    // begin exit animation
    setShow(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, ANIM_MS);
  }, [onClose]);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    // Imperative shim to keep existing showModal/close calls working
    el.showModal = () => {
      // mount, then next frame: show to trigger enter animation
      setOpen(true);
      requestAnimationFrame(() => {
        setShow(true);
        // defer onOpen until content is mounted and animation begins
        if (typeof onOpen === "function") {
          setTimeout(() => onOpen(), 0);
        }
      });
    };
    el.close = () => closeAnimated();

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeAnimated();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Clean up shim
      delete el.showModal;
      delete el.close;
    };
  }, [id, closeAnimated]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const onBackdropClick = (e) => {
    if (e.target === containerRef.current) closeAnimated();
  };

  // Render a wrapper div with the provided id so external code can find it
  return (
    <div id={id}>
      {open && (
        <div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          onMouseDown={onBackdropClick}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ease-in-out ${
              show ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Content */}
          <div
            className={`relative z-[1001] w-full max-w-md rounded-lg bg-base-100 text-base-content shadow-lg p-6 transform transition-all duration-200 ease-in-out ${
              show
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95"
            } ${className}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
