import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useRef, useState } from "react";

const FileWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #d6dbe4;
    padding: 0 5px;
    transition: all ease 0.1s;
    background-color: #fff;

    &:focus-within {
        border: 1px solid ${theme.colors.warning};
        box-shadow: 0 0 2px ${theme.colors.warning};
    }

    &.invalid {
        border: 1px solid ${theme.colors.error};
        box-shadow: 0 0 2px ${theme.colors.error};
    }
`;

const FileBox = styled.input`
    height: 32px;
    width: ${(props) => props.width ?? "100%"};
    font-size: 14px;
    border: none;

    &::placeholder {
        color: #d5d5d5;
    }

    &:focus {
        outline: none;
    }
`;

const InputFile = styled.input`
    position: absolute;
    left: 0;
    opacity: 0;
    max-width: 0;
    width: 0;
    pointer-events: none;
`;

const TextBox = ({ children, placeholder, rules, innerClass, ...rest }) => {
    const [isValid, setIsValid] = useState(true);
    const [file, setFile] = useState(null);
    const fileBoxRef = useRef<ref>();
    const fileRef = useRef<ref>();

    const checkValid = (value) => {
        let res = true;

        if (rules) {
            rules.forEach((validator) => {
                if (!validator(value)) res = false;
            });
        }

        if (rest.setValid) rest.setValid(res);
    };

    const changeHandler = (e) => {
        console.log("1111 ::: ", e.target.files[0]);
        if (e.target.files.length === 0) return;
        setFile(e.target.files[0]);
        fileBoxRef.current.value = e.target.files[0].name;
        console.log("22222 ::: ", e.target.files[0]);
        rest.onChange(e);
    };

    return (
        <FileWrapper className={`${isValid ? "" : "invalid"} ${innerClass ? innerClass : ""}`}>
            <FileBox
                ref={fileBoxRef}
                onBlur={(e) => checkValid(e.target.value)}
                onClick={(e) => {
                    fileRef.current.click();
                }}
                placeholder={placeholder}
                type="text"
                readOnly
            >
                {children}
            </FileBox>
            <InputFile
                ref={fileRef}
                {...rest}
                type="file"
                onChange={(e) => changeHandler(e)}
            ></InputFile>
        </FileWrapper>
    );
};

export default TextBox;
