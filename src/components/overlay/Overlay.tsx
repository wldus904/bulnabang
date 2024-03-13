import styled, { StyledInterface } from "styled-components";

const OverlayWrapper: StyledInterface = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;

    ${(props) =>
        props.isToggle
            ? `
        @keyframes fade-in-animation {
            100% {
                background-color: rgba(0, 0, 0, 0.3);
            }
        }

        @keyframes fade-out-animation {
            100% {
                background-color: rgba(0, 0, 0, 0);
                display: none;
            }
        }

        &.hidden {
            animation: fade-out-animation 0.4s ease;
            animation-fill-mode: forwards;
            transform-origin: 50%, 50%;
        }

        &.show {
            animation: fade-in-animation 0.4s ease;
            animation-fill-mode: forwards;
            transform-origin: 50%, 50%;
        }
    `
            : "background-color: rgba(0, 0, 0, 0.3);"}
`;

const Overlay = ({ children, isToggle, isShow }): JSX.Element => {
    return (
        <OverlayWrapper isToggle={isToggle} className={isShow ? "show" : "hidden"}>
            {children}
        </OverlayWrapper>
    );
};

export default Overlay;
