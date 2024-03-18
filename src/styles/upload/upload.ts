import styled, { StyledInterface } from "styled-components";
import { theme } from "../theme";

export const UploadWrapper: StyledInterface = styled.div`
    margin: 10px 0;
    background-color: #fff;
`;

export const InputWrapper: StyledInterface = styled.div`
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        .input-box {
            height: 30px;
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

            input[type="text"] {
                height: 28px;
            }
        }
    }
`;

export const FileInputWrapper: StyledInterface = styled.ul`
    width: 100%;
    padding: 0;
    margin: 20px 0;
    list-style-type: none;
`;

export const FileInputContent: StyledInterface = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #ececec;

    &:first-child {
        border-top: 2px solid #c3c3c3;
        font-weight: 600;
        color: ${theme.colors.textPrimary};
        background-color: #f9f9f9;
    }
`;

export const FileContent: StyledInterface = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #ececec;

    &.text-center {
        justify-content: center;
        font-size: 14px;
    }

    .block {
        font-size: 14px;
        .timestamp {
            font-size: 11px;
            margin-left: 4px;
        }
    }

    .file-name {
        font-size: 14px;
        font-weight: 500;
    }

    .close-btn {
        cursor: pointer;
    }
`;

export const FileInputBox: StyledInterface = styled.div`
    display: flex;
    align-items: center;
    width: calc(100% - 60px);

    .input-box {
        height: 30px;
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

        input[type="text"] {
            height: 28px;
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
