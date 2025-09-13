import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchemas";
import InputField from "../common/InputField";
import { X } from "lucide-react";
import Modal from "../common/Modal";
import useAuthStore from "../../store/authStore";
import { loginUser } from "../../services/authService";
import LoadingButton from "../common/LoadingButton";
import toast from "react-hot-toast";

const LoginModal = ({ id = "login_modal" }) => {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });
  const login = useAuthStore((s) => s.login);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-console
      console.log("Login submit:", data);
      setSubmitting(true);
      const response = await loginUser(data);
      if (response.success) {
        console.log("Login response:", response);
        toast.success("Login successful");
        // login(response.user);
        if (response?.user) login(response.user);
        methods.reset();
      }

      const dlg = document.getElementById(id);
      dlg?.close();
    } catch (error) {
      const res = error.response.data.message;
      console.log("Login error response:", res);

      if (error?.response?.data?.needsVerification) {
        methods.reset();
        document.getElementById(id)?.close();

        const verifyModal = document.getElementById("verify_token_modal");
        verifyModal?.showModal();

        toast.error(error.response.data.message || "Please verify your email");
      } else {
        toast.error(error.response.data.message || "Login failed");
      }
    } finally {
      setSubmitting(false);
    }
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
          <LoadingButton
            type="submit"
            className="btn-success mt-2 w-full"
            isLoading={submitting}
          >
            {submitting ? "Logging in..." : "Log In"}
          </LoadingButton>
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
