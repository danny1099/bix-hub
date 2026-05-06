import { Metadata } from "next";
import { ResetPasswordSteps } from "@/modules/auth/components";

export default async function ForgotPassword() {
  return (
    <section className="flex size-full flex-col items-center justify-center py-6">
      <ResetPasswordSteps />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password? Don't worry, we got you.",
};
