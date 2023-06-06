import * as HoverCard from "@radix-ui/react-hover-card";
import * as Popover from "@radix-ui/react-popover";
import { ReactNode } from "react";
import {
  HoverCardContent,
  HoverCardArrow,
  PopoverContent,
  PopoverArrow,
  UserInfo,
  UserName,
  UserEmail,
  AvatarStyled,
  WrapperHover,
  WrapperPopover,
} from "./PersonalCard.styles";

interface PersonalCardProps {
  triggerComponent: ReactNode;
  name: string;
  email: string;
  image: string;
}

const getPersonalCardContent = (name: string, email: string, image: string) => {
  return (
    <>
      <AvatarStyled src={image} />
      <UserInfo>
        <UserName>{name}</UserName>
        <UserEmail>{email ? email : `${name}@mail.com`}</UserEmail>
      </UserInfo>
    </>
  );
};

export const PersonalCard = ({
  triggerComponent,
  name,
  email,
  image,
}: PersonalCardProps) => {
  return (
    <>
      <WrapperHover>
        <HoverCard.Root>
          <HoverCard.Trigger asChild>{triggerComponent}</HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCardContent>
              {getPersonalCardContent(name, email, image)}
              <HoverCardArrow />
            </HoverCardContent>
          </HoverCard.Portal>
        </HoverCard.Root>
      </WrapperHover>

      <WrapperPopover>
        <Popover.Root>
          <Popover.Trigger asChild>{triggerComponent}</Popover.Trigger>
          <Popover.Portal>
            <PopoverContent>
              {getPersonalCardContent(name, email, image)}
              <PopoverArrow />
            </PopoverContent>
          </Popover.Portal>
        </Popover.Root>
      </WrapperPopover>
    </>
  );
};
