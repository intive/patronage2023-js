interface UserInfo {
  firstName: string;
  lastName: string;
  avatar: string;
}

// TODO change to be generic
interface Step {
  screen: React.Component;
  props: {
    user?: string | UserInfo;
    onNext?: (value: string | UserInfo) => void;
    onBack?: () => void;
    onGoToBeginning?: () => void;
    done?: () => void;
    success?: boolean;
    onBackToStart?: () => void;
    loginHref?: string;
  };
}
interface FlowControllerProps {
  steps: Array<Step>;
  counter: number;
}

export const FlowController = ({ steps, counter }: FlowControllerProps) => {
  const { screen: Screen, props } = steps[counter];

  return <Screen {...props} />;
};
