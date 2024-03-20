import styled, { StyledInterface } from "styled-components";
import { theme } from "../theme";

export const SearchContent: StyledInterface = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;

    .input-box {
        margin-right: 10px;

        &:nth-child(1),
        &:nth-child(2) {
            width: 80px;
        }
        &:nth-child(3) {
            width: 120px;
        }
        &:nth-child(4) {
            width: 200px;
        }
    }
`;
