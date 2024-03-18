import styled, { StyledInterface } from "styled-components";
import { theme } from "@/styles/theme";

const BasicSelectBox: StyledInterface = styled.select`
    height: 36px;
    min-width: ${(props) => (props.width ? props.width : props.outline ? "70px" : "0")};
    border-radius: 4px;
    border: ${(props) => (props.outline ? "1px solid #d6dbe4" : "none")};
    padding: ${(props) => (props.outline ? "5px" : "0")};
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: center;
    transition: all ease 0.1s;

    &:focus {
        border: 1px solid ${theme.colors.main};
        box-shadow: 0 0 2px ${theme.colors.main};
    }

    &.invalid {
        border: 1px solid ${theme.colors.error};
        box-shadow: 0 0 2px ${theme.colors.error};
    }
`;

const Option: StyledInterface = styled.option`
    font-size: 14px;
    width: 100px !important;
    min-height: 32px;

    &[value=""][disabled] {
        display: none;
    }
`;

const SelectBox = ({ options, innerClass, ...rest }): JSX.Element => {
    return (
        <BasicSelectBox className={innerClass ? innerClass : ""} {...rest} defaultValue="">
            <Option value="" disabled>
                테스트
            </Option>
            {options.map((option) => {
                return (
                    <Option value={option.value ?? option} key={option.value ?? option}>
                        {option.title ?? option}
                    </Option>
                );
            })}
        </BasicSelectBox>
    );
};

export default SelectBox;
