import React from "react";
import styled, { StyledInterface } from "styled-components";

const FooterBox: StyledInterface = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    // position: relative;
    // transform: translateY(100vh);
`;

const Footer = (): JSX.Element => (
    <FooterBox>
        <span>Made by jypark2781@gmail.com</span>
    </FooterBox>
);

export default Footer;
