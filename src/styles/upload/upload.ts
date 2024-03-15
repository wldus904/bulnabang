import styled from "styled-components";
import { theme } from "../theme";

export const UploadWrapper: StyledInterface = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin: 10px 0;
    background-color: #fff;
`;

export const InputWrapper: StyledInterface = styled.div`
    display: flex;
    justify-content: center;

    .input-box {
        margin-right: 10px;
        &:nth-child(1) {
            width: 120px;
        }
        &:nth-child(2) {
            width: 300px;
        }
        &:nth-child(3) {
            width: 120px;
        }
    }

    .upload-btn {
        width: 120px;
        height: 35px;
    }
`;

export const FileInputContent: StyledInterface = styled.ul`
    width: 100%;
    padding: 0;
    background-color: #f7f3ff;
    list-style-type: none;
    border-top: 2px solid #aeb3bd;
`;

export const FileInputBox: StyledInterface = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;

    &:first-child {
        background-color: #f5eef9;
        border: 1px solid #E3EAF8
        font-weight: 600;
        color: ${theme.colors.textPrimary};
    }

    .input-box {
        margin-right: 10px;
        &:nth-child(1) {
            width: calc(30% - 10px);
            max-width: 200px;
        }
        &:nth-child(2) {
            width: calc(30% - 10px);
            max-width: 200px;
        }
        &:nth-child(3) {
            width: calc(40% - 10px);
            max-width: 400px;
        }
    }
`;

export const MsgContent: StyledInterface = styled.div`
    text-align: center;

    .check-icon {
        display: block;
        width: 60px;
        height: 60px;
        margin: auto;
        border-radius: 30px;
        color: #5d87ff;
        background-color: #ecf2ff;
    }
`;

export const BoldTitle: StyledInterface = styled.div`
    font-size: 15px;
    font-weight: 700;
    margin-top: 15px;
`;

export const MsgBox: StyledInterface = styled.div`
    font-size: 12px;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 15px;
`;
