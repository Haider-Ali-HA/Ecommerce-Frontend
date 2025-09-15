import React from "react";
import { useFormContext } from "react-hook-form";

/**
 * Checkbox - reusable checkbox integrated with react-hook-form
 * Props:
 * - name: string (form field name)
 * - label: string (display label)
 * - className: string (optional extra classes)
 */
const Checkbox = ({ name, label, className = "" }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message;

  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        {...register(name)}
      />
      <span className="text-text-primary select-none">{label}</span>
      {error && (
        <span className="ml-2 text-error text-sm font-medium">
          {String(error)}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
