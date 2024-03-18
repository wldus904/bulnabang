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
    FileInputWrapper,
    FileInputContent,
    FileContent,
    FileInputBox,
    MsgContent,
    MsgBox,
} from "@/styles/dataUpload/dataUpload";
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
import IconButton from "@/components/button/IconButton";

// icons
import CloseIcon from "@/assets/icon/closeIcon";

const Upload = (): JSX.Element => {
    const [msgTitle, setMsgTitle] = useState<str>(null);
    const [msg, setMsg] = useState<str>(null);
    const [ticker, setTicker] = useState<str>(null);
    const [contract, setContract] = useState<str>(null);
    const [price, setPrice] = useState<num>(null);
    const [files, setFiles] = useState<coinFile[]>([]);
    const [file, setFile] = useState<File>(null);
    const [block, setBlock] = useState<str>(null);
    const [timestamp, setTimestamp] = useState<str>(null);
    const [optionValid, setOptionValid] = useState<uploadValid>({
        ticker: null,
        contract: null,
        price: null,
        files: 0,
    });
    const [fileValid, setFileValid] = useState<filesdValid>({
        file: null,
        block: null,
        timestamp: null,
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
            const form = new FormData();
            form.append("ticker", ticker);
            form.append("contract", contract);
            form.append("price", price);
            form.append("files", files);
            // headers -> 'Content-Type': 'multipart/form-data'
            // const res: uploadRes = await registrationApi.postRegistration(form);
            openDialog("업로드 완료", "파일 업로드를 완료했습니다");
        } catch (error) {
            openDialog("업로드 실패", error.message);
        }
    };

    const addFile = () => {
        if (!isAddValid) return;
        const newFile: coinFile = { block, timestamp, file };
        setFiles((prevFiles) => [...prevFiles, newFile]);
        setOptionValid({ ...optionValid, files: true });
    };

    const delFile = (idx) => {
        setFiles((prevFiles) => prevFiles.filter((file, fileIdx) => fileIdx !== idx));
        // delFile 함수가 끝난 후 files에 데이터가 반영되기 때문에 0이 아닌 1로 계산
        setOptionValid({ ...optionValid, files: files.length > 1 });
    };

    const openDialog = (title, msg): void => {
        setMsgTitle(title);
        setMsg(msg);
        msgDialogRef.current.open();
    };

    const closeDialog = (): void => {
        msgDialogRef.current.close();
        setLoading(false);
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
                    loading={loading}
                    disabled={!isValid}
                    onClick={uploadFile}
                    color={theme.colors.mainBtn}
                    width="fit-content"
                >
                    CSV 업로드
                </Button>
            </InputWrapper>

            <FileInputWrapper>
                <FileInputContent>
                    <FileInputBox>
                        <TextBox
                            placeholder="Time Stamp"
                            rules={[required]}
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            setValid={(value) => setFileValid({ ...fileValid, timestamp: value })}
                            isSelect
                            innerClass="input-box"
                        />
                        <TextBox
                            placeholder="Block"
                            rules={[required]}
                            value={block}
                            onChange={(e) => setBlock(e.target.value)}
                            setValid={(value) => setFileValid({ ...fileValid, block: value })}
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
                    </FileInputBox>
                    <SubButton
                        disabled={!isAddValid}
                        onClick={addFile}
                        width="fit-content"
                        innerClass="add-btn"
                        outline
                    >
                        추가
                    </SubButton>
                </FileInputContent>
                {files.length > 0 ? (
                    files.map((item, idx) => (
                        <FileContent key={`file-${idx}`}>
                            <div>
                                <div className="block">
                                    {item.block}
                                    <span className="timestamp">({item.timestamp})</span>
                                </div>
                                <div className="file-name">{item.file.name}</div>
                            </div>
                            <IconButton onClick={() => delFile(idx)}>
                                <CloseIcon width="18" height="18" alt="close"></CloseIcon>
                            </IconButton>
                        </FileContent>
                    ))
                ) : (
                    <FileContent className="text-center">CSV 파일을 추가해주세요</FileContent>
                )}
            </FileInputWrapper>

            <DefaultDialog ref={msgDialogRef} title={msgTitle}>
                <MsgContent>
                    <MsgBox>{msg}</MsgBox>
                    <Button onClick={closeDialog} color="#445169">
                        확인
                    </Button>
                </MsgContent>
            </DefaultDialog>
        </UploadWrapper>
    );
};

export default Upload;
