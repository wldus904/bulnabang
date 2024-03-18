import styled, { StyledInterface } from "styled-components";
import { theme } from "../theme";

export const DataTabledWrapper: StyledInterface = styled.div`
    margin: 10px 0;
`;

export const TopWrapper: StyledInterface = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SearchContent: StyledInterface = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .input-box {
        margin-right: 10px;

        &:nth-child(3) {
            width: 120px;
        }
        &:nth-child(4) {
            width: 120px;
        }
        &:nth-child(5) {
            width: 120px;
        }
        &:nth-child(6) {
            width: 300px;
        }
    }
`;
