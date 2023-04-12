interface UserInfo {
  firstName: string;
  lastName: string;
  avatar: string;
}

// TODO change to be generic
interface Step {
  screen: JSX.Element;
  props: {
    user: string | UserInfo;
    onNext?: (value: string | UserInfo) => void;
    onBack?: () => void;
    onGoToBeginning?: () => void;
    done?: () => void;
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
