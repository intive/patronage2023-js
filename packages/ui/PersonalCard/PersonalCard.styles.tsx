import * as HoverCard from "@radix-ui/react-hover-card";
import * as Popover from "@radix-ui/react-popover";
import styled from "styled-components";
import { Avatar } from "../Avatar";
import { device } from "web/lib/media-queries";

/* HoverCard */

export const WrapperHover = styled.div`
  display: none;
  ${device.tablet} {
    display: inline-block;
  }
`;

export const HoverCardContent = styled(HoverCard.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.personalCard.background};
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  overflow: hidden;

  padding: 0.8em 2em;
  gap: 10px;
  z-index: 5;
`;

export const HoverCardArrow = styled(HoverCard.Arrow)`
  fill: ${({ theme }) => theme.personalCard.main};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const UserName = styled.span`
  font-size: 24px;
`;

export const UserEmail = styled.span`
  font-size: 12px;
`;

export const AvatarStyled = styled(Avatar)`
  height: 96px;
  width: 96px;
`;

/* Popover */

export const WrapperPopover = styled.div`
  display: inline-block;
  ${device.tablet} {
    display: none;
  }
`;

export const PopoverContent = styled(Popover.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.personalCard.background};
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  overflow: hidden;

  padding: 10px;
  gap: 10px;
  z-index: 5;
`;

export const PopoverArrow = styled(Popover.Arrow)`
  fill: ${({ theme }) => theme.personalCard.main};
`;
