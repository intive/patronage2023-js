import * as Select from "@radix-ui/react-select";
import {
  SelectContentStyled,
  SelectItemStyled,
  SelectTriggerStyled,
} from "./LanguageSelectorStyled";
import styled from "styled-components";

import { useHasScrollBar } from "lib/hooks/useHasScrollBar";
import { Avatar } from "ui";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslate } from "lib/hooks";

export const AvatarStyled = styled(Avatar)`
  height: 2.1em;
  width: 2.1em;
`;

export const MainMenu = () => {
  const { hasScrollbar } = useHasScrollBar();
  const router = useRouter();
  const { data } = useSession();
  const { t, dict } = useTranslate("MainPage");

  const menuHandler = (value: string) => {
    if (value === "sign-out") {
      router.push("/");
      signOut();
    }
    router.push("/");
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
        <Select.Root onValueChange={(value) => menuHandler(value)}>
          <SelectTriggerStyled>
            <Select.Value>
              <AvatarStyled src="avatars/3.svg" outlined />
            </Select.Value>
          </SelectTriggerStyled>

          <Select.Portal className={hasScrollbar ? "radix-scroll" : ""}>
            <SelectContentStyled
              position="popper"
              align="center"
              sideOffset={5}>
              <Select.Viewport>
                {items.map((item) => (
                  <SelectItemStyled value={item.value} key={item.value}>
                    <Select.ItemText>{item.text}</Select.ItemText>
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
//
