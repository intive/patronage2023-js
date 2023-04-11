import { useState } from "react";
interface userObject {
  email: string;
  password: string;
  profile: {
    name: string;
    surname: string;
    avatar: string;
  };
}

export const FlowController = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<number | null>(null); // 200, 400
  const [user, setUser] = useState<userObject>({
    email: "",
    password: "",
    profile: {
      name: "",
      surname: "",
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

  const validateProfile = async (profileInfo: userObject["profile"]) => {
    //set profile info to user
    setUser({ ...user, profile: profileInfo });

    //hash password here so when user goes back to password screen, he can't see it properly
    const hashedPassword = await user.password; //encrypt password with bcrypt or something similar

    //useState might not be updated here, so we use fetch with passed profileInfo directly
    fetch("http://strzelam_w_backend:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: hashedPassword,
        profile: profileInfo,
      }),
    }).then((res) => {
      setResult(res.status);
    });
  };

  const steps = [
    {
      screen: <div>Email</div>,
      props: { user, onNext: validateEmail },
    },
    {
      screen: <div>Password</div>,
      props: { user, onNext: validatePassword, onBack: goBack },
    },
    {
      screen: <div>Profile</div>,
      props: { user, onNext: validateProfile, onBack: goBack },
    },
    {
      screen: <div>Result</div>,
      props: {
        result,
        onBack: goToBeginning,
      },
    },
  ];
  const Screen = steps[currentStep].screen;

  return <>{Screen}</>;
};
