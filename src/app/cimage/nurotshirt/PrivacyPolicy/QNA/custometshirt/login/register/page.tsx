import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center h-screen bg-black text-white">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </main>
  );
}