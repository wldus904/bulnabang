import { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const PasswordWrapper = styled.div`
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #d6dbe4;
    padding: 0 5px;
    transition: all ease 0.2s;

    &:focus-within {
        outline: none;
        border: 1px solid ${theme.colors.main};
        box-shadow: 0 0 2px ${theme.colors.main};
    }

    &.invalid {
        border: 1px solid ${theme.colors.error};
        box-shadow: 0 0 2px ${theme.colors.error};
    }

    .icon-btn {
        width: 18px;
        height: 18px;
    }
`;

const BasicPasswordBox = styled.input`
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

const IconBtnBox = styled.div`
    padding-top: 1px;
    cursor: pointer;
`;

const Password = ({ children, placeholder, type, rules, isSelect, value, ...rest }) => {
    const [isShow, setIsShow] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const checkValid = (value) => {
        let res = true;

        if (rules) {
            rules.forEach((validator) => {
                if (!validator(value)) res = false;
            });
        }

        if (rest.setValid) rest.setValid(res);

        setIsValid(res);
    };

    return (
        <PasswordWrapper className={isValid ? "" : "invalid"}>
            <BasicPasswordBox
                onBlur={(e) => checkValid(e.target.value)}
                onFocus={(e) => isSelect && e.target.select()}
                placeholder={placeholder}
                {...rest}
                type={isShow ? "text" : "password"}
                autoComplete="new-password"
                value={value || ""}
            >
                {children}
            </BasicPasswordBox>
            <IconBtnBox onClick={() => setIsShow(!isShow)}>
                {isShow ? <BsEye className="icon-btn" /> : <BsEyeSlash className="icon-btn" />}
            </IconBtnBox>
        </PasswordWrapper>
    );
};

export default Password;
