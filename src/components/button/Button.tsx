import styled, { StyledInterface } from "styled-components";
import { theme } from "@/styles/theme";
import Spinner from "../spinner/Spinner";

const hexToRgb = (hexType: String = "primary", alpha: Number = 1): string => {
    if (theme.colors[hexType]) hexType = theme.colors[hexType];
    const hex: string = hexType.trim().replace("#", "");
    const rgb: string = 3 === hex.length ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

    rgb.forEach(function (str, x, arr) {
        if (str.length == 1) str = str + str;
        arr[x] = parseInt(str, 16);
    });

    return `rgba(${rgb.join(", ")}, ${alpha})`;
};

const DefaultButton: StyledInterface = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: auto;
    border-radius: 3px;
    font-weight: bold;
    padding-left: 14px;
    padding-right: 14px;
    transition: all ease 0.1s;
    height: ${(props) => props.height ?? "32"}px;
    width: ${(props) => props.width ?? "100%"};
    font-size: 14px;

    &.able {
        cursor: pointer;
    }
`;

const BasicButton: StyledInterface = styled(DefaultButton)`
    border: none;
    color: #fff;
    background-color: #e2e2e2;

    &.able {
        color: ${(props) => props.txtColor ?? "#fff"};
        background-color: ${(props) => hexToRgb(props.color)};

        &:hover {
            background: ${(props) => hexToRgb(props.color, "0.9")};
        }
        &:active {
            background: ${(props) => hexToRgb(props.color, "1")};
        }
    }
`;

const OutlineButton: StyledInterface = styled(DefaultButton)`
    border: 1px solid #e2e2e2;
    color: #e2e2e2;

    &.able {
        border: 1px solid ${(props) => hexToRgb(props.color)};
        color: ${(props) => props.txtColor ?? hexToRgb(props.color)};
        background: #fff;

        &:hover {
            background: ${(props) => hexToRgb(props.color, "0.1")};
        }
        &:active {
            background: ${(props) => hexToRgb(props.color, "0.2")};
        }
    }
`;

const Button = ({ children, loading, disabled, innerClass, ...rest }): JSX.Element => {
    if (rest.outline)
        return (
            <OutlineButton
                className={`${loading || disabled ? "" : "able"} ${innerClass ? innerClass : ""}`}
                disabled={loading || disabled}
                {...rest}
            >
                {loading ? <Spinner size="20px"></Spinner> : children}
            </OutlineButton>
        );
    else
        return (
            <BasicButton
                className={`${loading || disabled ? "" : "able"} ${innerClass ? innerClass : ""}`}
                disabled={loading || disabled}
                {...rest}
            >
                {loading ? <Spinner size="20px"></Spinner> : children}
            </BasicButton>
        );
};

export default Button;
