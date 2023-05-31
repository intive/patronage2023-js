import styled from "styled-components";
import * as Select from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { useTranslate } from "lib/hooks";
import { Avatar, Icon } from "ui";

export const AvatarStyled = styled(Avatar)`
  height: 2.1em;
  width: 2.1em;
`;

const IconUpStyled = styled(Icon)`
  transform: rotate(180deg);
`;

export const MainMenu = () => {
  const { hasScrollbar } = useHasScrollBar();
  const router = useRouter();
  const { data } = useSession();
  const { t, dict } = useTranslate("MainPage");

  const [isIconDown, setIsIconDown] = useState<boolean | undefined>();

  const IconUp = () => <IconUpStyled icon="arrow_drop_down" />;
  const IconDown = () => <Icon icon="arrow_drop_down" />;

  const menuHandler = (value: string) => {
    value === "sign-out" ? signOut() : router.push("/");
  };

  const items = [
    {
      value: "home",
      text: t(dict.home),
    },
    {
      value: "sign-out",
      text: t(dict.signOut),
    },
  ];

  return (
    <>
      {data && (
        <Select.Root
          value=""
          onValueChange={menuHandler}
          onOpenChange={() => setIsIconDown(!isIconDown)}>
          <SelectTriggerStyled>
            <Select.Value>
              <AvatarStyled src={data.user.image} outlined />
            </Select.Value>
            <Select.Icon className="SelectIcon">
              {isIconDown ? <IconUp /> : <IconDown />}
            </Select.Icon>
          </SelectTriggerStyled>
          <Select.Portal className={hasScrollbar ? "radix-scroll" : ""}>
            <SelectContentStyled
              position="popper"
              align="center"
              sideOffset={5}>
              <Select.Viewport>
                {items.map(({ value, text }) => (
                  <SelectItemStyled value={value} key={value}>
                    <Select.ItemText>{text}</Select.ItemText>
                  </SelectItemStyled>
                ))}
              </Select.Viewport>
            </SelectContentStyled>
          </Select.Portal>
        </Select.Root>
      )}
    </>
  );
};

const SelectTriggerStyled = styled(Select.Trigger)`
  color: ${({ theme }) => theme.avatar.outline};
  background-color: unset;
  cursor: pointer;
  border: 0;
  padding: 0;
  line-height: 0;
`;

const SelectContentStyled = styled(Select.Content)`
  overflow: hidden;
  color: ${({ theme }) => theme.datePicker.neutral10};
  background-color: ${({ theme }) => theme.card.background};
  z-index: 10;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
    0px 2px 4px rgba(32, 37, 50, 0.03);
`;

const SelectItemStyled = styled(Select.Item)`
  cursor: pointer;
  padding: 15px 20px;
  display: flex;
  border: 2px solid ${({ theme }) => theme.card.background};
  align-items: center;
  gap: 10px;

  :hover {
    background-color: ${({ theme }) => theme.currencySelect.focusBackground};
    outline: 0;
    border: 2px solid ${({ theme }) => theme.card.background};
  }

  :focus {
    outline: 0;
    border: 2px solid ${({ theme }) => theme.input.focus};
    background-color: ${({ theme }) => theme.currencySelect.focusBackground};
    :hover {
      border: 2px solid ${({ theme }) => theme.card.background};
    }
  }
  :first-of-type:focus {
    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
  }
  :last-of-type:focus {
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }
`;
