import styled from "styled-components";
import { theme } from "./theme";

const LayoutWrapper = styled.div`
    height: 100vh;
    overflow-y: auto;
    background-color: #fafafa;
    &::-webkit-scrollbar {
        width: 15px; /* 스크롤바의 너비 */
    }
`;

const OverLay = styled.div`
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

const LayoutBox = styled.div`
    height: calc(100% - 70px);
    display: flex;
`;
const SideMenuBox = styled.div`
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
const MainBox = styled.div`
    position: relative;
    width: 100vw;
    height: 100%;
`;
const Contents = styled.div`
    position: relative;
    max-width: 900px;
    padding: 20px;
    min-height: calc(100vh - 100px); // view height - (header + footer)
    background-color: #fff;
    margin: auto;
`;

export { LayoutWrapper, OverLay, LayoutBox, SideMenuBox, MainBox, Contents };
