import styled from "styled-components";
import { Card, Textarea } from "ui";
import * as Tabs from "@radix-ui/react-tabs";
import { device } from "lib/media-queries";

export const ModalStyled = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const CardStyled = styled(Card)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0;
  padding: 32px 48px;
  ${device.tablet} {
    width: auto;
    height: auto;
    border-radius: 1rem;
  }
`;

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
    color: #82d3af;
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
`;

export const InputWrapperHalfStyled = styled.div`
  width: 210px;
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
