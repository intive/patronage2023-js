"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

 function LinkComponent() {
  return (
      <LinkStyled>
        <Link href="/" style={{textDecoration: 'none'}}>Log In</Link>
      </LinkStyled>
  );
}

export type LinkProps = {
    href: string;
    onClick?: Function;
  } & React.HTMLProps<HTMLButtonElement>;

  
const LinkStyled = styled.div`
     position: absolute;
     left: 0px;
     top: 0px;
     font-family: 'Inter';
     font-style: normal;
     font-weight: 400;
     font-size: 16px;
     line-height: 24px;
     color: #397B65;
     width: 46px;
     height: 24px;
`;

export default LinkComponent;

// /* Log in */
//     width: 46px;
//     height: 24px;
// /* Sign up */
//     width: 58px;
//     height: 24px;
// /* Manage */
//     width: 54px;
//     height: 20px;
//     flex: none;
//     order: 1;
//     flex-grow: 0;