import { FormWrapper } from "./SignUpFormStyled";

interface UserInfo {
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Step {
  screen: React.ComponentType<any>;
  props: {
    userInfo?: string | UserInfo;
    onNext?: ((value: string) => void) | ((value: UserInfo) => void);
    onBack?: () => void;
    onGoToBeginning?: () => void;
    done?: (profileInfo: UserInfo) => Promise<void> | (() => void);
    success?: boolean;
    onBackToStart?: () => void;
    loginHref?: string;
  };
}
interface FlowControllerProps {
  steps: Step[];
  counter: number;
}

export const FlowController = ({ steps, counter }: FlowControllerProps) => {
  const { screen: Screen, props } = steps[counter];

  return (
    <FormWrapper>
      <Screen {...props} />
    </FormWrapper>
  );
};
