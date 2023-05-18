import { atom, useAtom } from "jotai";
import { Icon, IconType } from "../Icon";
import {
  ToastProvider,
  StyledCloseButton,
  StyledDescription,
  StyledRoot,
  StyledViewport,
  StylingDiv,
  ToastVariant,
} from "./Toast.styles";

type ToastAtom = ToastVariant & { message: string };

const initialToast = { variant: "confirm", message: "" } as ToastAtom;

// primitive atom for current toast state
const toastAtom = atom(initialToast);

// writable atom for toast message and variant
const showToastAtom = atom(null, (_, set, update: ToastAtom) =>
  set(toastAtom, { message: update.message, variant: update.variant })
);

// custom hook for showing the atom, public
export const useToast = () => {
  const [, showToast] = useAtom(showToastAtom);

  return showToast;
};

const iconMap = {
  confirm: "check",
  error: "error",
} as Record<string, IconType>;

// 'tis where the toasts be
export const ToastHoast = () => {
  const [{ message, variant }, setToast] = useAtom(toastAtom);

  return (
    <ToastProvider
      duration={5000}
      label={"Notification window"}
      swipeDirection={"up"}
      swipeThreshold={30}>
      <StyledRoot
        open={!!message}
        onOpenChange={() => setToast(initialToast)}
        asChild>
        <StylingDiv variant={variant}>
          <StyledDescription>
            <Icon icon={iconMap[variant]} size={20} />
            {message}
          </StyledDescription>
          <StyledCloseButton>
            <Icon icon="close" iconSize={20} />
          </StyledCloseButton>
        </StylingDiv>
      </StyledRoot>
      <StyledViewport />
    </ToastProvider>
  );
};
