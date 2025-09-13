import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchemas";
import InputField from "../common/InputField";
import { X } from "lucide-react";
import Modal from "../common/Modal";

const LoginModal = ({ id = "login_modal" }) => {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log("Login submit:", data);
    const dlg = document.getElementById(id);
    dlg?.close();
  };

  // Open the register modal and close this login modal
  const openRegister = () => {
    const dlg = document.getElementById(id);
    dlg?.close();
    const reg = document.getElementById("register_modal");
    reg?.showModal();
  };

  return (
    <Modal id={id}>
      {/* Close button (top-right) */}
      <button
        type="button"
        aria-label="Close dialog"
        className="btn btn-ghost btn-sm absolute right-3 top-3"
        onClick={() => document.getElementById(id)?.close()}
      >
        <X size={18} />
      </button>
      <h3 className="mb-4 text-lg font-bold">Sign in</h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="********"
          />
          <button type="submit" className="btn btn-primary mt-2 w-full">
            Sign In
          </button>
          <div className="mt-3 text-center">
            <button
              type="button"
              className="btn btn-ghost text-sm"
              onClick={openRegister}
            >
              Don't have an account? Create one
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default LoginModal;
