"use client";
import { EmailScreen } from "./EmailScreen";
import { FlowController } from "./FlowController";
import { PasswordSubComponent } from "./PasswordSubComponent";
import { ProfileScreen } from "./ProfileScreen";
import { SuccessErrorScreen } from "./SuccessErrorScreen";
import { useState } from "react";

interface userObject {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

export const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<number | null>(null); // 200, 400
  const [user, setUser] = useState<userObject>({
    email: "",
    password: "",
    profile: {
      firstName: "",
      lastName: "",
      avatar: "",
    },
  });

  const goBack = () => setCurrentStep(currentStep - 1);

  const goToBeginning = () => {
    setCurrentStep(0);
  };
  const validateEmail = (email: string) => {
    // get validated email and set it to user
    setUser({ ...user, email });

    //go next
    setCurrentStep(currentStep + 1);
  };
  const validatePassword = (password: string) => {
    //get validated not hashed password and set it to user
    setUser({ ...user, password });

    //go next
    setCurrentStep(currentStep + 1);
  };

  const validateProfile = (profileInfo: userObject["profile"]) => {
    //set profile info to user
    setUser({ ...user, profile: profileInfo });

    //useState might not be updated here, so we use fetch with passed profileInfo directly
    //   fetch("http://strzelam_w_backend:5000", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: user.email,
    //       password: hashedPassword,
    //       profile: profileInfo,
    //     }),
    //   }).then((res) => {
    //     setResult(res.status);
    //   });
    // };

    setResult(user.email === "smutnarzaba@png.pl" ? 400 : 200); //mocked result
    setCurrentStep(currentStep + 1);
  };

  return (
    <FlowController
      counter={currentStep}
      steps={[
        {
          screen: EmailScreen,
          props: {
            onNext: validateEmail,
            onBack: goBack,
            userInfo: user.email,
          },
        },
        {
          screen: PasswordSubComponent,
          props: {
            onNext: validatePassword,
            onBack: goBack,
            userInfo: user.password,
          },
        },
        {
          screen: ProfileScreen,
          props: {
            done: validateProfile,
            onBack: goBack,
            userInfo: user.profile,
          },
        },
        {
          screen: SuccessErrorScreen,
          props: {
            loginHref: "/sign-in",
            onBackToStart: goToBeginning,
            success: result === 200,
          },
        },
      ]}
    />
  );
};
