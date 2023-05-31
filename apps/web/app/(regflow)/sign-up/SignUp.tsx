"use client";

import { EmailScreen } from "./EmailScreen";
import { FlowController } from "./FlowController";
import { PasswordSubComponent } from "./PasswordScreen";
import { ProfileScreen } from "./ProfileScreen";
import { SuccessErrorScreen } from "./SuccessErrorScreen";
import { useState } from "react";
import { env } from "env.mjs";
import { useMutation } from "@tanstack/react-query";
import useSuperfetch from "lib/hooks/useSuperfetch";
import { useUploadThing } from "lib/hooks/useUploadthing";

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
  const [user, setUser] = useState<userObject>({
    email: "",
    password: "",
    profile: {
      firstName: "",
      lastName: "",
      avatar: "",
    },
  });

  const fetch = useSuperfetch();

  const signUpMutation = useMutation({
    mutationFn: (user: userObject) => {
      const backendUser = {
        avatar: user.profile.avatar,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        password: user.password,
        email: user.email,
      };

      return fetch(`${env.NEXT_PUBLIC_API_URL}user/sign-up`, {
        method: "POST",
        body: backendUser,
      });
    },
    onSettled: () => {
      setCurrentStep(currentStep + 1);
    },
  });

  const { startUpload } = useUploadThing({
    endpoint: "imageUploader",
    onUploadError: (err) => console.error(err),
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

  const validateProfile = async (
    profileInfo: userObject["profile"],
    blob?: File
  ) => {
    const newUser = { ...user, profile: profileInfo };

    if (blob) {
      await startUpload([blob]).then((res) => {
        if (res)
          //we only accept one file so we know it's [0]
          newUser.profile.avatar = res[0].fileUrl;
      });
      //set profile info to user
      setUser(newUser);
      //run mutation
      signUpMutation.mutate(newUser);
    }
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
            success: signUpMutation.isSuccess,
          },
        },
      ]}
    />
  );
};
