import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

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
      {label && (
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>
      )}
      <div className="relative">
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
          className={`w-full rounded border px-3 py-2 ${
            type === "password" && enablePasswordToggle ? "pr-10" : ""
          } outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...register(name)}
          {...rest}
        />
        {type === "password" && enablePasswordToggle && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? (
              // Eye-off icon (simple SVG)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M3.53 2.47a.75.75 0 1 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-2.445-2.446A11.88 11.88 0 0 0 21.75 12C20.87 9.62 17.34 5.25 12 5.25c-1.414 0-2.705.31-3.87.82L3.53 2.47zM12 6.75c4.43 0 7.53 3.75 8.34 5.25-.315.6-.906 1.52-1.77 2.5l-2.284-2.284a4.5 4.5 0 0 0-6.252-6.252L8.886 6.14A8.1 8.1 0 0 1 12 6.75zm0 10.5c-4.43 0-7.53-3.75-8.34-5.25.339-.645 1.01-1.702 1.97-2.73l2.33 2.33a4.5 4.5 0 0 0 6.51 6.51l1.964 1.964c-1.082.414-2.287.676-3.434.676z" />
              </svg>
            ) : (
              // Eye icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 5.25C6.66 5.25 3.13 9.62 2.25 12c.88 2.38 4.41 6.75 9.75 6.75S20.87 14.38 21.75 12C20.87 9.62 17.34 5.25 12 5.25zm0 10.5A3.75 3.75 0 1 1 12 8.25a3.75 3.75 0 0 1 0 7.5z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message?.toString?.() || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default InputField;
