import styled, { StyledInterface } from "styled-components";
import { theme } from "@/styles/theme";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";

const BasicSelectWrapper: StyledInterface = styled.div`
    position: relative;
    width: ${(props) => (props.width ? props.width : "150px")};
    align-self: center;
`;

const SelectedOption: StyledInterface = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 45px 0 5px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #d6dbe4;
    background-color: #fff;
    cursor: pointer;
    transition: all ease 0.1s;
    transform: rotate(0deg);

    &.invalid {
        border: 1px solid ${theme.colors.error};
        box-shadow: 0 0 2px ${theme.colors.error};
    }

    &.active {
        border: 1px solid ${theme.colors.main};
        box-shadow: 0 0 2px ${theme.colors.main};

        .ic-arrow {
            transform: rotate(180deg);
        }
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

const InputButton: StyledInterface = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 5px;
`

const BasicSelectBox: StyledInterface = styled.ul`
    position: absolute;
    list-style: none;
    top: 36px;
    left: 0;
    width: calc(100% - 2px);
    max-height: 200px;
    padding: 0;
    margin: 0;
    border-radius: 3px;
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

    &.selected {
        background-color: #f6f3ff;
    }
`;

const SelectBox = ({ options, innerClass, value, placeholder, onChange }): JSX.Element => {
    const initialValue = value || { value: '', title: '' };
    const [currentValue, setCurrentValue] = useState(initialValue);
    const [isShowOptions, setShowOptions] = useState(false);
    const wrapperRef = useRef<ref>();
    const hiddenRef = useRef<ref>();
    const inputRef = useRef<ref>();
    const selectBoxRef = useRef<ref>();

    const handleOnChangeSelectValue = option => {
        onChange(option)
        setCurrentValue(option);
        setShowOptions(false);
    };

    const clear = e => {
        setCurrentValue({ value: '', title: '' });
        e.stopPropagation();
    }

    useEffect(() => {
        if (!isShowOptions) inputRef.current.blur();
    }, [isShowOptions])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <BasicSelectWrapper
            ref={wrapperRef}
            onClick={() => setShowOptions((prev) => !prev)}
            className={innerClass ?? ""}
        >
            <SelectedOption
                className={[currentValue.value ? "placeholder" : "", isShowOptions ? 'active' : '']}
            >
                <SelectedInput
                    ref={inputRef}
                    value={currentValue.title}
                    placeholder={placeholder}
                    type="text"
                    readOnly
                />
                <InputButton>
                    {currentValue.value && <IoMdClose onClick={clear} size="18" />}
                    <IoMdArrowDropdown size="18" className="ic-arrow" />
                </InputButton>
            </SelectedOption>
            {isShowOptions && (
                <BasicSelectBox ref={selectBoxRef} className={innerClass ? innerClass : ""}>
                    {options.map((option) => {
                        return (
                            <Option
                                onClick={e => handleOnChangeSelectValue(option)}
                                key={option.value ?? option}
                                className={currentValue.value === option.value ? 'selected' : ''}
                            >
                                {option.title ?? option}
                            </Option>
                        );
                    })}
                </BasicSelectBox>
            )
            }
        </BasicSelectWrapper >
    );
};

export default SelectBox;
