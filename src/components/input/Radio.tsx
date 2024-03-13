import styled, { StyledInterface } from "styled-components";
import { theme } from "@/styles/theme";

const RadioWrapper: StyledInterface = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    border: 1px solid #eae7e7;
    border-radius: 5px;
    white-space: nowrap;

    /* Checked */
    input[type="radio"]:checked + label {
        background: ${theme.colors.warning};
        color: #fff;
    }

    /* Disabled */
    input[type="radio"] + label {
        background: #f9fafc;
        color: #666;
    }
`;

const Label: StyledInterface = styled.label`
    font-size: 12px;
    display: inline-block;
    padding: 5px 10px;
    text-align: center;

    &:hover {
        background-color: ${theme.colors.warning};
        color: #fff;
        cursor: pointer;
    }
`;

const DefaultRadio: StyledInterface = styled.input`
    display: none;
`;

const Radio = ({ children, value, name, defaultChecked, disabled, ...rest }): JSX.Element => {
    return (
        <RadioWrapper>
            <DefaultRadio
                id={`${name}-${value}`}
                value={value}
                name={name}
                defaultChecked={defaultChecked}
                disabled={disabled}
                type="radio"
                className="test"
            />
            <Label htmlFor={`${name}-${value}`}>{children}</Label>
        </RadioWrapper>
    );
};

export default Radio;
