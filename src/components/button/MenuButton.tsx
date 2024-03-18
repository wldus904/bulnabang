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
    font-size: 16px;
    font-weight: 600;

    &:hover {
        color: ${theme.colors.error};
        background-color: ${theme.colors.lighterror};
    }
`;

const MenuButton = ({ children, currentPath, ...rest }): JSX.Element => {
    const theme: DefaultTheme = useTheme();
    const buttonRef: ref = useRef();
    const router: NextRouter = useRouter();

    useEffect(() => {
        if (currentPath === rest.href) {
            buttonRef.current.style.color = theme.colors.error;
        } else {
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
