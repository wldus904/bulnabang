import styled from "styled-components";
import { theme } from "./theme";

export const LayoutWrapper = styled.div`
    height: 100vh;
    overflow-y: auto;
    background-color: #f4f2f6;
    &::-webkit-scrollbar {
        width: 15px; /* 스크롤바의 너비 */
    }
`;

export const OverLay = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition-property: z-index, background-color;
    transition-duration: 0s, 0.1s;
    transition-delay: 0.2s, 0s;

    @media ${theme.device.tablet} {
        &.on {
            z-index: 2;
            background-color: rgba(0, 0, 0, 0.2);
            transition-property: z-index, background-color;
            transition-duration: 0s, 0.3s;
            transition-delay: 0s;
        }
    }
`;

export const LayoutBox = styled.div`
    height: calc(100% - 70px);
    display: flex;
`;
export const SideMenuBox = styled.div`
    position: absolute;
    width: 260px;
    left: -260px;
    top: 0;
    z-index: 2;
    background-color: #fff;
    -webkit-transition: left 0.3s;
    -moz-transition: left 0.3s;
    -ms-transition: left 0.3s;
    -o-transition: left 0.3s;
    transition: left 0.3s;

    &.on {
        left: 0px;
    }
`;
export const MainBox = styled.div`
    position: relative;
    width: 100vw;
    height: 100%;
`;
export const Contents = styled.div`
    position: relative;
    max-width: 1300px;
    padding: 10px;
    min-height: calc(100vh - 100px); // view height - (header + footer)
    background-color: #fff;
    margin: auto;
    margin-top: 20px;
`;
