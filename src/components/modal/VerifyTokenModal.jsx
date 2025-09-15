import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyTokenSchema } from "../../validation/authSchemas";
import Modal from "../common/Modal";
import LoadingButton from "../common/LoadingButton";
import { X } from "lucide-react";
import { verifyUser } from "../../services/authService";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";

const inputsCount = 6;

const VerifyTokenModal = ({ id = "verify_token_modal", email }) => {
  const methods = useForm({
    resolver: zodResolver(verifyTokenSchema),
    defaultValues: { verifyToken: "" },
    mode: "onTouched",
  });

  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef([]);
  const login = useAuthStore((s) => s.login);

  // Build a string from individual inputs in the DOM to set into RHF
  const syncValueFromInputs = () => {
    const value = (inputRefs.current || [])
      .map((el) => el?.value || "")
      .join("");
    methods.setValue("verifyToken", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const focusNext = (nextIndex) => {
    // small defer so browser has applied value change before focus
    requestAnimationFrame(() => {
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus?.();
      }, 0);
    });
  };

  const onChangeDigit = (index, e) => {
    const v = (e.target.value || "").replace(/\D/g, "");
    // keep only last digit typed
    e.target.value = v.slice(-1);
    syncValueFromInputs();
    if (v && index < inputsCount - 1) focusNext(index + 1);
  };

  const onKeyDownDigit = (index, e) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      // defer focus so caret logic completes
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
    // focus last filled
    const last = Math.min(text.length, inputsCount) - 1;
    if (last >= 0) focusNext(last);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await verifyUser({ verifyToken: data.verifyToken });
      toast.success(res?.message || "Verification successful");
      if (res?.user) login(res.user);
      methods.reset();
      document.getElementById(id)?.close();
    } catch (err) {
      toast.error(err?.response.data.message || "Invalid or expired code");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpen = () => {
    // reset and focus first input when modal opens
    methods.reset({ verifyToken: "" });
    if (inputRefs.current?.length) {
      inputRefs.current.forEach((el) => {
        if (el) el.value = "";
      });
    }
    setTimeout(() => inputRefs.current?.[0]?.focus?.(), 0);
  };

  return (
    <Modal id={id} onOpen={handleOpen}>
   
      <h3 className="mb-7 text-lg md:text-3xl  text-text-primary text-center font-bold">
        Verify your email
      </h3>
      {email && (
        <p className="mb-4 text-sm text-text-accent text-center">
          We sent a 6-digit code to {email}.
        </p>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <div
            className="mb-3 flex items-center justify-between gap-2"
            onPaste={onPaste}
          >
            {Array.from({ length: inputsCount }).map((_, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                inputMode="numeric"
                maxLength={1}
                className="h-12 w-10 rounded-md  bg-accent/20 text-center text-lg outline-none text-text-primary"
                onChange={(e) => onChangeDigit(i, e)}
                onKeyDown={(e) => onKeyDownDigit(i, e)}
              />
            ))}
          </div>
          {methods.formState.errors.verifyToken && (
            <p className="mt-1 text-sm text-error">
              {methods.formState.errors.verifyToken.message}
            </p>
          )}
          <LoadingButton
            type="submit"
            className="bg-primary text-text-secondary hover:bg-primary/80  mt-5 w-full"
            isLoading={submitting}
          >
            {submitting ? "Verifying..." : "Verify"}
          </LoadingButton>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default VerifyTokenModal;
