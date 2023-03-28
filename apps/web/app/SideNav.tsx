"use client"
import styled from "styled-components";
import sidenav from  "../public/sidenav.png"
import Image from "next/image";

const SideNavStyled = styled.div`
    width:7%;
    background-color: white;
    border: 1px solid #e1e1e1;
`
const ImageWrapper = styled.div`
    padding: 30px 0;
`

export default function SideNav() {
    return (
        <SideNavStyled>
            <ImageWrapper><Image src={sidenav} width={120} height={400} alt="sidenav"></Image></ImageWrapper>
        </SideNavStyled>
    );
  }
  