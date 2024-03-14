import React from "react";
import styled, { DefaultTheme, StyledInterface, useTheme } from "styled-components";
import { NextRouter, useRouter } from "next/router";
import { useEffect, use, useRef } from "react";
import { theme } from "@/styles/theme";

const Button: StyledInterface = styled.a`
    max-width: 190px;
    padding: 15px;
    transition: all ease 100ms 0s;
    border-radius: 3px;

    &:hover {
        color: ${theme.colors.primary};
        background-color: ${theme.colors.lightprimary};
    }
`;

const MenuButton = ({ children, currentPath, ...rest }): JSX.Element => {
    const theme: DefaultTheme = useTheme();
    const buttonRef: ref = useRef();
    const router: NextRouter = useRouter();

    useEffect(() => {
        if (currentPath === rest.href) {
            buttonRef.current.style.backgroundColor = theme.colors.primary;
            buttonRef.current.style.color = "#fff";
        } else {
            buttonRef.current.style.backgroundColor = "#fff";
            buttonRef.current.style.color = theme.colors.textPrimary;
        }
    }, [currentPath]);

    return (
        <Button ref={buttonRef} {...rest}>
            {children}
        </Button>
    );
};

export default MenuButton;
