import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/common/InputField";
import { registerSchema } from "../validation/authSchemas";

const Register = () => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    // Replace with actual register API call
    // eslint-disable-next-line no-console
    console.log("Register submit:", data);
    alert("Registration data valid! Check console for payload.");
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-semibold">Create an account</h1>
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

          <button
            type="submit"
            className="mt-2 w-full rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Register
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
