import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../common/InputField";
import Checkbox from "../common/Checkbox";
import LoadingButton from "../common/LoadingButton";
import { Lock, Mail, Phone, User } from "lucide-react";

/**
 * ManagerForm
 * Reusable form for creating/updating a manager.
 * Props:
 * - mode: 'create' | 'update'
 * - defaultValues: { name, email, phone, password? }
 * - onSubmit: async (values) => void
 * - submitting: boolean (controls LoadingButton)
 */
const ManagerForm = ({
  mode = "create",
  defaultValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    isVerified: false,
  },
  schema,
  onSubmit,
  submitting = false,
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const heading = useMemo(
    () => (mode === "create" ? "Add Manager" : "Update Manager"),
    [mode]
  );

  return (
    <div className="max-w-xl mx-auto border   rounded shadow-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-text-primary text-center mb-2">
        {heading}
      </h2>
      <p className="text-text-accent text-center mb-6">
        {mode === "create"
          ? "Fill in details to create a new manager."
          : "Update the manager's information."}
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4">
            <InputField
              name="name"
              label="Name"
              placeholder="Enter your name"
              icon={<User className="h-4 w-4" />}
            />
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="h-4 w-4" />}
            />
            <InputField
              name="phone"
              label="Phone"
              placeholder="Enter phone number"
              icon={<Phone className="h-4 w-4" />}
            />
            {/* Password: required in create, optional in update (schema handles this) */}
             {mode === "create" && (
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="h-4 w-4" />}
            />
                )}
          </div>

          {/* Admin-only control: mark manager as verified */}
          <div className="mt-2">
            <Checkbox name="isVerified" label="Mark as verified" />
          </div>

          {/* Submit */}
          <LoadingButton
            type="submit"
            className="bg-primary text-text-secondary hover:bg-primary/80 mt-6 w-full"
            isLoading={submitting}
          >
            {mode === "create"
              ? submitting
                ? "Creating..."
                : "Create Manager"
              : submitting
              ? "Updating..."
              : "Update Manager"}
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default ManagerForm;
