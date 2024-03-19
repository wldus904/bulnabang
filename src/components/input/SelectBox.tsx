import styled, { StyledInterface } from "styled-components";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const BasicSelectWrapper: StyledInterface = styled.div`
    position: relative;
    min-width: ${(props) => (props.width ? props.width : "fit-content")};
    align-self: center;
`;

const SelectedOption: StyledInterface = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #d6dbe4;
    background-color: #fff;
    cursor: pointer;
    transition: all ease 0.1s;
    transform: rotate(0deg);

    &:focus-within {
        border: 1px solid ${theme.colors.main};
        box-shadow: 0 0 2px ${theme.colors.main};

        .ic-arrow {
            transform: rotate(180deg);
        }
    }

    &.invalid {
        border: 1px solid ${theme.colors.error};
        box-shadow: 0 0 2px ${theme.colors.error};
    }
`;

const SelectedInput: StyledInterface = styled.input`
    width: 100%;
    height: 32px;
    border: none;
    background-color: #fff;
    cursor: pointer;

    &::placeholder {
        color: #d5d5d5;
    }

    &:focus {
        outline: none;
    }
`;

const BasicSelectBox: StyledInterface = styled.ul`
    position: absolute;
    list-style: none;
    top: 32px;
    left: 0;
    width: 100%;
    max-height: 200px;
    padding: 0;
    margin: 0;
    border-radius: 4px;
    border: 1px solid #d6dbe4;
    overflow: hidden;
    background-color: #fff;
    cursor: pointer;
`;

const Option: StyledInterface = styled.li`
    font-size: 14px;
    padding: 6px 8px;
    transition: background-color 0.1s ease-in;

    &:hover {
        background-color: #f9f9fd;
    }

    .active {
        background-color: #f6f3ff;
    }
`;

const SelectBox = ({ options, innerClass, ...rest }): JSX.Element => {
    const [currentValue, setCurrentValue] = useState(rest.value);
    const [isShowOptions, setShowOptions] = useState(false);

    const handleOnChangeSelectValue = (e) => {
        const { innerText } = e.target;
        setCurrentValue(innerText);
    };

    return (
        <BasicSelectWrapper
            onClick={() => setShowOptions((prev) => !prev)}
            className={innerClass ?? ""}
        >
            <SelectedOption className={!currentValue ? "placeholder" : ""}>
                <SelectedInput {...rest} type="text" readOnly />
                <IoMdArrowDropdown size="16" className="ic-arrow" />
            </SelectedOption>
            {isShowOptions && (
                <BasicSelectBox className={innerClass ? innerClass : ""} {...rest}>
                    {options.map((option) => {
                        return (
                            <Option
                                onClick={handleOnChangeSelectValue}
                                key={option.value ?? option}
                            >
                                {option.title ?? option}
                            </Option>
                        );
                    })}
                </BasicSelectBox>
            )}
        </BasicSelectWrapper>
    );
};

export default SelectBox;
