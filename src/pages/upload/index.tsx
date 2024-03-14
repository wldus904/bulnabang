// util
import { useState, useEffect, useRef } from "react";
import { required } from "@/utils/valid";

// api
import * as registrationApi from "@/apis/user/registration.ts";

// style
import styled from "styled-components";
import {
    UploadWrapper,
    InputWrapper,
    FileInputContent,
    FileInputBox,
    MsgContent,
    BoldTitle,
    MsgBox,
} from "@/styles/upload/upload.ts";

// types, interfaces
import { str, num, coinFile } from "@/interfaces/common";
import { uploadValid, uploadRes } from "@/interfaces/upload";

// components
import TextBox from "@/components/input/TextBox";
import Button from "@/components/button/Button";
import DefaultDialog from "@/components/dialog/DefaultDialog";

const Upload = (): JSX.Element => {
    const [msgTitle, setMsgTitle] = useState<str>(null);
    const [msg, setMsg] = useState<str>(null);
    const [ticker, setTicker] = useState<str>(null);
    const [contract, setContract] = useState<str>(null);
    const [price, setPrice] = useState<num>(null);
    const [files, setFiles] = useState<coinFile[]>([]);
    const [optionValid, setOptionValid] = useState<uploadValid>({
        ticker: null,
        contract: null,
        price: null,
        files: [],
    });
    const [isValid, setIsValid] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const msgDialogRef = useRef<ref>();

    const validator = (): void => {
        let res: Boolean = true;
        Object.keys(optionValid).forEach((valid: string) => {
            if (!optionValid[valid]) {
                res = false;
            }
        });
        setIsValid(res);
    };

    const uploadFile = async (): void => {
        validator();
        if (!isValid) return;

        setLoading(true);
        try {
            const params: uploadValid = {
                ticker,
                contract,
                price,
                files,
            };
            // const res: uploadRes = await registrationApi.postRegistration(params);
            setMsgTitle("업로드 완료");
            setMsg("파일 업로드를 완료했습니다");
            msgDialogRef.current.open();
        } catch (error) {
            setMsgTitle("업로드 실패");
            setMsg(error.message);
            msgDialogRef.current.open();
        }
    };

    const closeDialog = (): void => {
        msgDialogRef.current.close();
    };

    useEffect(validator, [optionValid]);

    return (
        <UploadWrapper>
            <InputWrapper>
                <TextBox
                    placeholder="티커"
                    rules={[required]}
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    setValid={(value) => {
                        setOptionValid({ ...optionValid, ticker: value });
                    }}
                    autoComplete="off"
                    isSelect
                    innerClass="input-box"
                />
                <TextBox
                    placeholder="컨트랙트"
                    rules={[required]}
                    value={contract}
                    onChange={(e) => setContract(e.target.value)}
                    setValid={(value) => {
                        setOptionValid({ ...optionValid, contract: value });
                    }}
                    autoComplete="off"
                    isSelect
                    innerClass="input-box"
                />
                <TextBox
                    placeholder="가격"
                    rules={[required]}
                    value={price}
                    width="98%"
                    onChange={(e) => setPrice(e.target.value)}
                    setValid={(value) => {
                        setOptionValid({ ...optionValid, price: value });
                    }}
                    autoComplete="off"
                    isSelect
                    innerClass="input-box"
                />

                <Button
                    color="warning"
                    loading={loading}
                    disabled={!isValid}
                    onClick={uploadFile}
                    innerClass="upload-btn"
                >
                    CSV 업로드
                </Button>
            </InputWrapper>

            <FileInputContent>
                <FileInputBox>
                    <TextBox placeholder="CSV 파일" value={contract} disabled isSelect />
                    <TextBox placeholder="Block" value={contract} isSelect />
                    <TextBox placeholder="Time Stamp" value={contract} isSelect />
                    <Button color="warning">추가</Button>
                </FileInputBox>
                <FileInputBox>test2</FileInputBox>
            </FileInputContent>

            <DefaultDialog ref={msgDialogRef}>
                <MsgContent>
                    <BoldTitle>{msgTitle}</BoldTitle>
                    <MsgBox>{msg}</MsgBox>
                    <Button onClick={closeDialog} color="error">
                        확인
                    </Button>
                </MsgContent>
            </DefaultDialog>
        </UploadWrapper>
    );
};

export default Upload;