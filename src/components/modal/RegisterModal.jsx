import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/authSchemas";
import InputField from "../common/InputField";
import { Lock, Mail, Phone, User, X } from "lucide-react";
import { registerUser } from "../../services/authService";
import toast from "react-hot-toast";
import LoadingButton from "../common/LoadingButton";
import Modal from "../common/Modal";

const RegisterModal = ({ id = "register_modal" }) => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", phone: "" },
    mode: "onTouched",
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const result = await registerUser(data);
      // eslint-disable-next-line no-console
      console.log("Registration result:", result);
      toast.success(
        result?.message || "Registration successful! Please verify your email."
      );
      methods.reset();
      const dlg = document.getElementById(id);
      dlg?.close();
      // open verify token modal
      const verifyDlg = document.getElementById("verify_token_modal");
      verifyDlg?.showModal?.();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Registration error:", err);
      toast.error(err?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Open the login modal and close this register modal
  const openLogin = () => {
    const dlg = document.getElementById(id);
    dlg?.close();
    const login = document.getElementById("login_modal");
    login?.showModal();
  };

  return (
    <Modal id={id}>
      <h3 className="mb-4 text-lg md:text-3xl text-text-primary text-center font-bold">
        Create account
      </h3>
      <p className="mb-4 text-sm text-text-accent text-center">
        Please fill in the details to create a new account.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <InputField
            name="name"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            icon={<User className="h-4 w-4" />}
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            placeholder="Enter your email"
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock className="h-4 w-4" />}
          />
          <InputField
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            icon={<Phone className="h-4 w-4" />}
          />
          <LoadingButton
            type="submit"
            className="bg-primary text-text-secondary hover:bg-primary/80  mt-5 w-full"
            isLoading={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </LoadingButton>
          <div className="mt-3 text-center">
            <button
              type="button"
              className=" text-text-primary font-semibold hover:text-text-primary/80 text-sm"
              onClick={openLogin}
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default RegisterModal;
