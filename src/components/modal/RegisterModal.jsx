import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/authSchemas";
import InputField from "../common/InputField";

const RegisterModal = ({ id = "register_modal" }) => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", phone: "" },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log("Register submit:", data);
    const dlg = document.getElementById(id);
    dlg?.close();
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">Create account</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <InputField
              name="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
            />
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
            <InputField
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="10-15 digits"
            />
            <button type="submit" className="btn btn-success mt-2 w-full">
              Register
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

export default RegisterModal;
