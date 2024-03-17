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

const OutlineButton: StyledInterface = styled.button`
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
    border: 1px solid ${(props) => props.borderColor ?? "#d6dbe4"};
    color: ${(props) => props.txtColor ?? "#e2e2e2"};
    background-color: ${(props) => props.backgroundColor ?? "#fcfcfc"};

    &.able {
        color: ${(props) => props.txtColor ?? "#5a616d"};
        background-color: ${(props) => props.backgroundColor ?? "#fff"};
        cursor: pointer;

        &:hover {
            background-color: ${(props) => hexToRgb(props.txtColor ?? "#5a616d", "0.05")};
        }
        &:active {
            background-color: ${(props) => hexToRgb(props.txtColor ?? "#5a616d", "0.1")};
        }
    }
`;

const Button = ({ children, loading, disabled, innerClass, ...rest }): JSX.Element => {
    return (
        <OutlineButton
            className={`${loading || disabled ? "" : "able"} ${innerClass ? innerClass : ""}`}
            disabled={loading || disabled}
            {...rest}
        >
            {loading ? <Spinner size="20px"></Spinner> : children}
        </OutlineButton>
    );
};

export default Button;
