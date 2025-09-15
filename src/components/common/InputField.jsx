import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

/**
 * Reusable InputField integrated with React Hook Form via useFormContext.
 * Props:
 * - name: string (required) - field name in form
 * - label: string (optional) - label text
 * - type: string (optional) - input type (text, email, password, tel)
 * - placeholder: string (optional)
 * - className: string (optional) - additional input CSS classes
 * - containerClass: string (optional) - wrapper div classes
 * - labelClass: string (optional) - label classes
 * - enablePasswordToggle: boolean (optional) - show eye toggle for password fields (default true)
 */
const InputField = ({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  containerClass = "mb-4",
  labelClass = "block mb-1 font-medium",
  enablePasswordToggle = true,
  icon = null,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name];
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={containerClass}>
      {/* {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )} */}
      <div className="relative">
        {icon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-text-accent pl-1 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={name}
          type={
            type === "password" && enablePasswordToggle
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className={`w-full rounded   bg-neutral text-text-primary placeholder:text-text-accent border-primary  px-5 py-2 ${
            icon ? "pl-10" : ""
          } ${
            type === "password" && enablePasswordToggle ? "pr-10" : ""
          } outline-none  ${
            error ? "border-error" : "border-neutral"
          } ${className}`}
          {...register(name)}
          {...rest}
        />
        {type === "password" && enablePasswordToggle && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 text-text-accent -translate-y-1/2 rounded p-1  "
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">
          {error.message?.toString?.() || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default InputField;
