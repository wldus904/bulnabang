import styled, { StyledInterface } from "styled-components";
import { theme } from "@/styles/theme";

const CardWrapper: StyledInterface = styled.div`
    padding: 10px;
    background-color: #fff;
`;

const Card = ({ children, ...rest }): JSX.Element => {
    return <CardWrapper {...rest}>{children}</CardWrapper>;
};

export default Card;
