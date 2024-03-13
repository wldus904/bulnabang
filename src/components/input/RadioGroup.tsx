import styled, { StyledInterface } from "styled-components";
import Radio from "./Radio";

const RadioGroupWrapper: StyledInterface = styled.fieldset`
    display: flex;
    flex-direction: ${(props) => (props.topTitle ? "column" : "row")};
    align-items: center;
    border: none;
    padding: 0;
`;
const Title: StyledInterface = styled.span`
    font-weight: 600p;
    margin-bottom: 3px;
    margin-right: 10px;
    white-space: nowrap;
`;

const RadioGroupBox: StyledInterface = styled.div`
    display: flex;
    flex-direction: row;
`;

const RadioGroup = ({
    setValue,
    radios,
    topTitle,
    leftTitle,
    groupName,
    disabled,
    rules,
    setValid,
}): JSX.Element => {
    const onChangeValue = (e: Event): void => {
        setValue(e.target.value);
        checkValid(e.target.value);
    };

    const checkValid = (value): void => {
        let res: Boolean = true;

        rules.forEach((validator) => {
            if (!validator(value)) res = false;
        });

        setValid(res);
    };

    return (
        <RadioGroupWrapper topTitle={topTitle} disabled={disabled}>
            {topTitle || leftTitle ? <Title>{topTitle || leftTitle}</Title> : null}
            <RadioGroupBox onChange={onChangeValue}>
                {radios.map((radio) => {
                    return (
                        <Radio
                            key={radio.value}
                            value={radio.value}
                            defaultChecked={radio.defaultChecked}
                            name={groupName}
                        >
                            {radio.label}
                        </Radio>
                    );
                })}
            </RadioGroupBox>
        </RadioGroupWrapper>
    );
};

export default RadioGroup;
