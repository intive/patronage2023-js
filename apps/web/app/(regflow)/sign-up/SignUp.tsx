"use client";

import { EmailScreen } from "./EmailScreen";
import { FlowController } from "./FlowController";
import { PasswordSubComponent } from "./PasswordScreen";
import { ProfileScreen } from "./ProfileScreen";
import { SuccessErrorScreen } from "./SuccessErrorScreen";
import { useState } from "react";
import { env } from "env.mjs";

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
    const newUser = { ...user, profile: profileInfo };
    setUser(newUser);

    const backendUser = {
      avatar: newUser.profile.avatar,
      firstName: newUser.profile.firstName,
      lastName: newUser.profile.lastName,
      password: newUser.password,
      email: newUser.email,
    };

    // @ts-ignore
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    fetch(env.NEXT_PUBLIC_API_URL + "user/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendUser),
    })
      .then((result) => {
        setResult(result.status);
        setCurrentStep(currentStep + 1);
      })
      .catch(() => {
        setResult(400);
        setCurrentStep(currentStep + 1);
      });
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
