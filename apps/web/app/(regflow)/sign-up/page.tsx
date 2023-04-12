// import { SignUpForm } from "./SignUpForm";
"use client"
import { EmailScreen } from "./EmailScreen"

export default function SignUpPage() {
  // return <SignUpForm />;
  return (
    <EmailScreen onNext={ () => console.log('test')} />
  );
}
