"use client";

import AuthWrapper from "@/modules/auth/AuthWrapper";
import LoginForm from "./LoginForm";

const LoginModule = () => {
  return (
    <AuthWrapper isLogin>
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginModule;
