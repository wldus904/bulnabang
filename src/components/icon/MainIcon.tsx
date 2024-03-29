import React from "react";
import styled, { StyledInterface } from "styled-components";
import { NextRouter, useRouter } from "next/router";

// icons
import FireIcon from "@/assets/icon/fireIcon";

const IconBox: StyledInterface = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #f71010;
    cursor: pointer;
`;

const MainIcon = ({ ...rest }): JSX.Element => {
    const router: NextRouter = useRouter();
    const clickHandler = (e: MouseEvent) => {
        e.preventDefault();
        router.push("/");
    };

    return (
        <IconBox href="/" {...rest} onClick={clickHandler}>
            <FireIcon width="40" height="40" alt="icon"></FireIcon>
            BULNABANG
        </IconBox>
    );
};
export default MainIcon;
