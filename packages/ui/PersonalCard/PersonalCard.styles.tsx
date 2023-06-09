import * as HoverCard from "@radix-ui/react-hover-card";
import * as Popover from "@radix-ui/react-popover";
import styled, { css } from "styled-components";
import { Avatar } from "ui/Avatar";
import { device } from "web/lib/media-queries";

const CommonContentStyled = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.personalCard.background};
  border: 1px solid ${({ theme }) => theme.card.border};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  overflow: hidden;
  gap: 10px;
  z-index: 11;
  padding: 0.4em 1em;

  ${device.tablet} {
    padding: 0.8em 2em;
  }
`;

/* HoverCard */

export const WrapperHover = styled.div`
  display: none;
  ${device.tablet} {
    display: inline-block;
  }
`;

export const HoverCardContent = styled(HoverCard.Content)`
  ${CommonContentStyled}
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
  font-weight: 500;
  font-size: 1em;

  ${device.tablet} {
    font-size: 1.125em; //18px;
  }
`;

export const UserEmail = styled.span`
  font-size: 0.75em; //12px;
  ${device.tablet} {
    font-size: 0.875em; //14px;
  }
`;

export const AvatarStyled = styled(Avatar)`
  height: 48px;
  width: 48px;
  ${device.tablet} {
    height: 60px;
    width: 60px;
  }
`;

/* Popover */

export const WrapperPopover = styled.div`
  display: inline-block;
  ${device.tablet} {
    display: none;
  }
`;

export const PopoverContent = styled(Popover.Content)`
  ${CommonContentStyled}
  flex-direction: column;

  ${device.tablet} {
    display: none;
  }
`;

export const PopoverArrow = styled(Popover.Arrow)`
  fill: ${({ theme }) => theme.personalCard.main};
`;

export const PopoverRoot = styled(Popover.Root)``;

export const PopoverTrigger = styled(Popover.Trigger)``;

export const PopoverPortal = styled(Popover.Portal)``;
