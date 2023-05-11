import { SkeletonLoading } from "ui";
import styled from "styled-components";
import { PropsWithChildren } from "react";

export const TransactionsTableSuspense = () => {
  const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    gap: 20px;
    flex-basis: 100%;
    width: 100%;
  `;

  const HeadersWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30%;
  `;

  const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    flex-basis: 70%;
    gap: 10px;
    position:relative;
  `;

  const Gradient = styled.div`
    background: linear-gradient(to bottom,transparent, white);
    z-index:1;
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    height:100%;
  `
  const SingleSkeletonWrapperHeader = ({
    children,
  }: PropsWithChildren<unknown>) => {
    return (
      <div
        style={{
          flexBasis: "15%",
        }}>
        {children}
      </div>
    );
  };

  const SingleSkeletonWrapperContent = ({
    children,
  }: PropsWithChildren<unknown>) => {
    return (
      <div
        style={{
          width: "100%",
          zIndex:0,
        }}>
        {children}
      </div>
    );
  };

  return (
    <MainWrapper>
      <HeadersWrapper>
      <SkeletonLoading
        count={4}
        containerClassName="skeleton-header-wrapper"
        wrapper={SingleSkeletonWrapperHeader}
      /> 
      </HeadersWrapper>
      <ContentWrapper>
      < Gradient/>
      <SkeletonLoading
        count={4}
        containerClassName="flex-content-wrapper"
        wrapper={SingleSkeletonWrapperContent}
      />
      </ContentWrapper>
    </MainWrapper>
  );
};