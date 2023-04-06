import { useState } from "react";
interface userObject {
  email: string;
  password: string;
  profile: {
    name: string;
    surname: string;
  };
  avatar: string;
}

export const FlowController = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState<userObject>({
    email: "",
    password: "",
    profile: {
      name: "",
      surname: "",
    },
    avatar: "",
  });

  const goBack = () => setCurrentStep(currentStep - 1);
  const goNext = () => setCurrentStep(currentStep + 1);

  const submitEmail = () => {};
  const submitPassword = () => {};
  const submitProfile = () => {};
  const result = "test";
  const steps = [
    {
      screen: <div>Email</div>,
      props: { user, onNext: goNext, validate: submitEmail },
    },
    {
      screen: <div>Password</div>,
      props: { user, onNext: goNext, onBack: goBack, validate: submitPassword },
    },
    {
      screen: <div>Profile</div>,
      props: { user, onNext: goNext, onBack: goBack, validate: submitProfile },
    },
    {
      screen: <div>Result</div>,
      props: {
        result,
        onBack: goBack,
      },
    },
  ];
  const Screen = steps[currentStep].screen;

  return <div>{Screen}</div>;
};
