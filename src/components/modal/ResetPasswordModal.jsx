import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LoadingButton from "../common/LoadingButton";
import InputField from "../common/InputField";
import toast from "react-hot-toast";
import { resetPassword as resetPasswordApi } from "../../services/authService";
import { resetPasswordSchema } from "../../validation/authSchemas";
import { Navigate } from "react-router-dom";

const inputsCount = 6;

const ResetPasswordModal = () => {
  const methods = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { resetPasswordToken: "", newPassword: "" },
    mode: "onTouched",
  });

  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef([]);

  //   const navigate = useNavigate();

  const syncValueFromInputs = () => {
    const value = (inputRefs.current || [])
      .map((el) => el?.value || "")
      .join("");
    methods.setValue("resetPasswordToken", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const focusNext = (nextIndex) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus?.();
      }, 0);
    });
  };

  const onChangeDigit = (index, e) => {
    const v = (e.target.value || "").replace(/\D/g, "");
    e.target.value = v.slice(-1);
    syncValueFromInputs();
    if (v && index < inputsCount - 1) focusNext(index + 1);
  };

  const onKeyDownDigit = (index, e) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      setTimeout(() => inputRefs.current[index - 1]?.focus?.(), 0);
    }
  };

  const onPaste = (e) => {
    const text = (e.clipboardData.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, inputsCount);
    if (!text) return;
    e.preventDefault();
    text.split("").forEach((ch, i) => {
      const ref = inputRefs.current[i];
      if (ref) ref.value = ch;
    });
    syncValueFromInputs();
    const last = Math.min(text.length, inputsCount) - 1;
    if (last >= 0) focusNext(last);
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const payload = {
        resetPasswordToken: data.resetPasswordToken,
        newPassword: data.newPassword,
      };
      const res = await resetPasswordApi(payload);
      toast.success(res?.message || "Password reset successful");
      methods.reset();

      // Show the login modal so the user can log in with new password
      document.getElementById("login_modal")?.showModal?.();
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to reset password";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-dvh border w-full flex items-center justify-center ">
      <div className="w-full max-w-md bg-base-100 border border-base-300 rounded-lg p-6 shadow-md">
        <h3 className="mb-4 text-lg font-bold">Reset password</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} onPaste={onPaste}>
            <div className="mb-3 flex items-center justify-between gap-2">
              {Array.from({ length: inputsCount }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-12 w-10 rounded-md border border-base-300 bg-base-100 text-center text-lg outline-none focus:border-primary"
                  onChange={(e) => onChangeDigit(i, e)}
                  onKeyDown={(e) => onKeyDownDigit(i, e)}
                />
              ))}
            </div>

            {methods.formState.errors.resetPasswordToken && (
              <p className="mt-1 text-sm text-error">
                {methods.formState.errors.resetPasswordToken.message}
              </p>
            )}

            <InputField
              name="newPassword"
              label="New password"
              type="password"
              placeholder="New strong password"
            />

            <LoadingButton
              type="submit"
              className="btn-primary mt-2 w-full"
              isLoading={submitting}
            >
              {submitting ? "Resetting..." : "Reset password"}
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
