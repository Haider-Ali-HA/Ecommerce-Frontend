import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import LoadingButton from "../common/LoadingButton";
import toast from "react-hot-toast";
import { forgotPassword as forgotPasswordApi } from "../../services/authService";
import { forgotPasswordSchema } from "../../validation/authSchemas";



const ForgotPasswordModal = ({ id = "forgot_password_modal" }) => {
  const methods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await forgotPasswordApi({ email: data.email });
      toast.success(res.message || "Password reset email sent");
      methods.reset();
      document.getElementById(id)?.close();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to send reset email";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal id={id}>
      <h3 className="mb-4 text-lg font-bold">Forgot password</h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <LoadingButton
            type="submit"
            className="btn-success mt-2 w-full"
            isLoading={submitting}
          >
            {submitting ? "Sending..." : "Send reset email"}
          </LoadingButton>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ForgotPasswordModal;
