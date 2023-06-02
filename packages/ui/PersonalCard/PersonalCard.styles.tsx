import * as HoverCard from "@radix-ui/react-hover-card";
import * as Popover from "@radix-ui/react-popover";
import styled from "styled-components";
import { Avatar } from "../Avatar";

/* HoverCard */

export const HoverCardContent = styled(HoverCard.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.personalCard.background};
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 0 2px 6px rgba(32, 41, 50, 0.1);
  border-radius: 16px;
  overflow: hidden;

  padding: 10px;
  gap: 10px;
  z-index: 100;
`;

export const HoverCardArrow = styled(HoverCard.Arrow)`
  fill: ${({ theme }) => theme.personalCard.main};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-size: 16px;
`;

export const UserEmail = styled.span`
  font-size: 8px;
`;

export const AvatarStyled = styled(Avatar)`
  height: 64px;
  width: 64px;
`;

/* Popover */

export const PopoverContent = styled(Popover.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.personalCard.background};
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 0 2px 6px rgba(32, 41, 50, 0.1);
  border-radius: 16px;
  overflow: hidden;

  padding: 10px;
  gap: 10px;
  z-index: 100;
`;

export const PopoverArrow = styled(Popover.Arrow)`
  fill: ${({ theme }) => theme.personalCard.main};
`;
