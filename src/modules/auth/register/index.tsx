"use client";

import AuthWrapper from "@/modules/auth/AuthWrapper";
import RegisterForm from "./RegisterForm";

const RegisterModule = () => {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterModule;
