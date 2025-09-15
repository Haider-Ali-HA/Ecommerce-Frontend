import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../common/InputField";
import Modal from "../common/Modal";
import LoadingButton from "../common/LoadingButton";
import toast from "react-hot-toast";
import { forgotPassword as forgotPasswordApi } from "../../services/authService";
import { forgotPasswordSchema } from "../../validation/authSchemas";
import { Mail } from "lucide-react";

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
      <h3 className="mb-7 text-lg md:text-3xl  text-text-primary text-center font-bold">
        Reset your password
      </h3>{" "}
      <p className="mb-4 text-sm text-text-accent text-center">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="h-4 w-4" />}
            
          />
          <LoadingButton
            type="submit"
                className="bg-primary text-text-secondary hover:bg-primary/80  mt-5 w-full"
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
