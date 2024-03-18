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

const IconButton: StyledInterface = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props.padding ?? "3px"};
    border-radius: 50%;
    outline: none;
    border: none;
    cursor: auto;
    transition: all ease 0.1s;
    height: fit-content;
    width: fit-content;
    background-color: ${(props) => props.backgroundColor ?? "transparent"};
    opacity: 0.7;

    &.able {
        opacity: 1;
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
        <IconButton
            className={`${loading || disabled ? "" : "able"} ${innerClass ? innerClass : ""}`}
            disabled={loading || disabled}
            {...rest}
        >
            {loading ? <Spinner size="20px"></Spinner> : children}
        </IconButton>
    );
};

export default Button;
