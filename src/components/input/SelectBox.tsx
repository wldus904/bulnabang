import styled, { StyledInterface } from "styled-components";

const BasicSelectBox: StyledInterface = styled.select`
    height: 32px;
    min-width: ${(props) => (props.width ? props.width : props.outline ? "70px" : "0")};
    border-radius: 4px;
    border: ${(props) => (props.outline ? "1px solid #d6dbe4" : "none")};
    padding: ${(props) => (props.outline ? "0 10px 0 5px" : "0")};
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    text-align: center;

    &:focus {
        outline: none;
    }
`;

const Option: StyledInterface = styled.option`
    font-size: 14px;
    width: 100px !important;
`;

const SelectBox = ({ options, ...rest }): JSX.Element => {
    return (
        <BasicSelectBox {...rest}>
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
