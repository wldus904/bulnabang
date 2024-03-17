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
import { theme } from "@/styles/theme";

// types, interfaces
import { str, num } from "@/interfaces/common";
import { uploadValid, filesdValid, coinFile, uploadRes } from "@/interfaces/upload";

// components
import TextBox from "@/components/input/TextBox";
import File from "@/components/input/File";
import Button from "@/components/button/Button";
import SubButton from "@/components/button/SubButton";
import DefaultDialog from "@/components/dialog/DefaultDialog";

const Upload = (): JSX.Element => {
    const [msgTitle, setMsgTitle] = useState<str>(null);
    const [msg, setMsg] = useState<str>(null);
    const [ticker, setTicker] = useState<str>(null);
    const [contract, setContract] = useState<str>(null);
    const [price, setPrice] = useState<num>(null);
    const [files, setFiles] = useState<coinFile[]>([]);
    const [file, setFile] = useState<File>(null);
    const [block, setBlock] = useState<str>(null);
    const [timeStamp, setTimeStamp] = useState<str>(null);
    const [optionValid, setOptionValid] = useState<uploadValid>({
        ticker: null,
        contract: null,
        price: null,
        files: 0,
    });
    const [fileValid, setFileValid] = useState<filesdValid>({
        file: null,
        block: null,
        timeStamp: null,
    });
    const [isValid, setIsValid] = useState<Boolean>(false);
    const [isAddValid, setIsAddValid] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const msgDialogRef = useRef<ref>();

    const validator = (valid, setIs): void => {
        let res: Boolean = true;
        Object.keys(valid).forEach((key: string) => {
            if (!valid[key]) {
                res = false;
            }
        });
        setIs(res);
    };

    const uploadFile = async (): void => {
        validator(optionValid, setIsValid);
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

    const addFile = () => {
        if (!isAddValid) return;
        const newFile: coinFile = { block, timeStamp, file };
        setFiles(prevFiles => [...prevFiles, newFile]);
        setOptionValid({ ...optionValid, files: true });
    };

    const closeDialog = (): void => {
        msgDialogRef.current.close();
    };

    useEffect(() => {
        validator(optionValid, setIsValid);
        validator(fileValid, setIsAddValid);
    }, [optionValid, fileValid]);

    return (
        <UploadWrapper>
            <InputWrapper>
                <div>
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
                        onChange={(e) => setPrice(e.target.value)}
                        setValid={(value) => {
                            setOptionValid({ ...optionValid, price: value });
                        }}
                        autoComplete="off"
                        isSelect
                        innerClass="input-box"
                    />
                </div>

                <Button
                    color="warning"
                    loading={loading}
                    disabled={!isValid}
                    onClick={uploadFile}
                    color={theme.colors.mainBtn}
                    width="fit-content"
                >
                    CSV 업로드
                </Button>
            </InputWrapper>

            <FileInputContent>
                <FileInputBox>
                    <div>
                        <TextBox
                            placeholder="Block"
                            rules={[required]}
                            value={block}
                            onChange={(e) => setBlock(e.target.value)}
                            setValid={(value) => setFileValid({ ...fileValid, block: value })}
                            isSelect
                            innerClass="input-box"
                        />
                        <TextBox
                            placeholder="Time Stamp"
                            rules={[required]}
                            value={timeStamp}
                            onChange={(e) => setTimeStamp(e.target.value)}
                            setValid={(value) => setFileValid({ ...fileValid, timeStamp: value })}
                            isSelect
                            innerClass="input-box"
                        />
                        <File
                            placeholder="CSV 파일"
                            rules={[required]}
                            onChange={(e) => setFile(e.target.files[0])}
                            setValid={(value) => setFileValid({ ...fileValid, file: value })}
                            innerClass="input-box"
                        />
                    </div>
                    <SubButton
                        disabled={!isAddValid}
                        onClick={addFile}
                        width="fit-content"
                        innerClass="add-btn"
                        outline
                    >
                        추가
                    </SubButton>
                </FileInputBox>
                {files.map((item, index) => (
                    <FileInputBox key={`file-${index}`}>
                        block: {item.block}<br />
                        timeStamp: {item.timeStamp}<br />
                        file: {item.file.name}<br />
                    </FileInputBox>
                ))}
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
