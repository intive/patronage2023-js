import styled from "styled-components";
import { Separator, Textarea } from "ui";
import * as Tabs from "@radix-ui/react-tabs";
import { device } from "lib/media-queries";

export const TabsStyled = styled(Tabs.Root)`
  width: 311px;
  ${device.tablet} {
    width: 464px;
  }
`;

export const TabsListStyled = styled(Tabs.List)`
  display: flex;
  margin-bottom: 24px;
`;

export const TabsTriggerStyled = styled(Tabs.Trigger)`
  font-family: unset;
  font-size: 14px;
  font-weight: 600;
  background-color: white;
  color: #7e7e7e;
  width: 50%;
  border: 0;
  cursor: pointer;
  padding: 8px 8px 12px 8px;
  border-bottom: 2px solid white;
  &[data-state="active"] {
    color: #397b65;
    border-bottom: 2px solid #397b65;
  }
  &[disabled],
  &[disabled]:hover {
    color: ${({ theme }) => theme.button.secondary.disabled};
    cursor: not-allowed;
  }
  &:hover {
    color: #1e4c40;
  }
`;

export const TabsContentStyled = styled(Tabs.Content)``;

export const ParagraphStyled = styled.p`
  font-style: unset;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-left: 3px;
`;

export const InputWrapperFullStyled = styled.div`
  margin-top: 24px;
  width: 100%;
  margin-bottom: 10px;
`;

export const InputWrapperHalfStyled = styled.div`
  width: 210px;
  margin-bottom: 10px;
`;

export const TextareaStyled = styled(Textarea)`
  margin-bottom: 36px;
`;

export const InputWrapperFullFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const SeparatorStyled = styled(Separator)`
  display: block;
  width: calc(100% + calc(48px * 2));
  margin-top: 48px;
  margin-left: -48px;
`;

export const SeparatorStyledTop = styled(Separator)`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;

export const ButtonWrapperStyled = styled.div`
  display: block;
  padding-top: 24px;
`;
