import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchemas";
import InputField from "../common/InputField";

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

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
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
          </form>
        </FormProvider>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close">close</button>
      </form>
    </dialog>
  );
};

export default LoginModal;
