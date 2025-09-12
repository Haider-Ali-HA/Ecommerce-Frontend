import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/common/InputField";
import { loginSchema } from "../validation/authSchemas";

const Login = () => {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    // Replace with actual login API call
    // eslint-disable-next-line no-console
    console.log("Login submit:", data);
    alert("Login data valid! Check console for payload.");
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-semibold">Login</h1>
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

          <button
            type="submit"
            className="mt-2 w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
