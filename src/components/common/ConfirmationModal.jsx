import React from "react";
import LoadingButton from "./LoadingButton";

const ConfirmationModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80">
      <div className="bg-secondary rounded-2xl shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <p className="mt-2 text-text-accent text-sm">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-accent text-text-secondary hover:bg-accent/80 transition"
            disabled={loading}
          >
            {cancelText}
          </button>

          <LoadingButton
            className="px-4 py-2 rounded-lg bg-error text-white hover:bg-error/80 transition"
            onClick={onConfirm}
            isLoading={loading}
          >
            {confirmText}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
