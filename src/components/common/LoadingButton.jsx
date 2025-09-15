import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Reusable loading button
 * Props:
 * - isLoading: boolean
 * - children: node
 * - className: string
 * - type: button|submit|reset (default: 'button')
 * - disabled: boolean
 */
const LoadingButton = ({
  isLoading = false,
  children,
  className = "",
  type = "button",
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={` py-3 rounded inline-flex items-center justify-center gap-2 transition-all duration-100 ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Loader2 className="animate-spin" size={18} />}
      <span>{children}</span>
    </button>
  );
};

export default LoadingButton;
