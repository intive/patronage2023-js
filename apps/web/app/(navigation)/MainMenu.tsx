import styled from "styled-components";
import * as Select from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { useTranslate } from "lib/hooks";
import { Avatar, Icon } from "ui";

import { SelectContentStyled, SelectItemStyled } from "ui/Select/Select.styles";

export const AvatarStyled = styled(Avatar)`
  height: 2.1em;
  width: 2.1em;
`;

const SelectTriggerStyled = styled(Select.Trigger)`
  color: ${({ theme }) => theme.avatar.outline};
  background-color: unset;
  cursor: pointer;
  border: 0;
  padding: 0;
  line-height: 0;
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
