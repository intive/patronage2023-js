import * as HoverCard from "@radix-ui/react-hover-card";
import * as Popover from "@radix-ui/react-popover";
import { useMediaQuery } from "react-responsive";
import {
  HoverCardContent,
  HoverCardArrow,
  PopoverContent,
  PopoverArrow,
  UserInfo,
  UserName,
  UserEmail,
  AvatarStyled,
} from "./PersonalCard.styles";

interface PersonalCardProps {
  triggerComponent: any;
  user: any;
}

export const PersonalCard = ({ triggerComponent, user }: PersonalCardProps) => {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <>
      {isTablet ? (
        <HoverCard.Root>
          <HoverCard.Trigger asChild>{triggerComponent}</HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCardContent>
              <AvatarStyled src={user.image ? user.image : user.avatar} />
              <UserInfo>
                <UserName>
                  {user.name ? user.name : user.firstName + " " + user.lastName}
                </UserName>
                <UserEmail>
                  {user.email
                    ? user.email
                    : user.firstName + user.lastName + `@mail.com`}
                </UserEmail>
              </UserInfo>

              <HoverCardArrow />
            </HoverCardContent>
          </HoverCard.Portal>
        </HoverCard.Root>
      ) : (
        <Popover.Root>
          <Popover.Trigger asChild>{triggerComponent}</Popover.Trigger>
          <Popover.Portal>
            <PopoverContent>
              <AvatarStyled src={user.avatar} />
              <UserInfo>
                <UserName>
                  {user.firstName} {user.lastName}
                </UserName>
                <UserEmail>
                  {user.email
                    ? user.email
                    : user.firstName + user.lastName + `@mail.com`}
                </UserEmail>
              </UserInfo>
              <PopoverArrow />
            </PopoverContent>
          </Popover.Portal>
        </Popover.Root>
      )}
    </>
  );
};
