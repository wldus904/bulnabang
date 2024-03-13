import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import styled, { StyledInterface } from "styled-components";
import { BsX } from "react-icons/bs";
import Overlay from "@/components/overlay/Overlay";
import { clickOutSide } from "@/utils/event.ts";

const DialogWrapper: StyledInterface = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DialogBox: StyledInterface = styled.div`
    @keyframes fade-in-dropdown-animation {
        0% {
            transform: scale(0);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes fade-out-dropdown-animation {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0);
            opacity: 0;
        }
    }

    transform: scale(0);
    opacity: 0;
    background-color: #fff;
    box-shadow: 0 0 4px #d6dbe4;
    min-width: 250px;
    min-height: 200px;
    width: ${(props) => props.width ?? 400}px;

    &.hidden {
        animation: fade-out-dropdown-animation 0.4s ease;
        animation-fill-mode: forwards;
        transform-origin: 50%, 50%;
    }

    &.show {
        animation: fade-in-dropdown-animation 0.4s ease;
        animation-fill-mode: forwards;
        transform-origin: 50%, 50%;
    }

    .close-btn {
        width: 22px;
        height: 22px;
        padding: 5px;
        border-radius: 15px;
        color: #5a6a85;
        cursor: pointer;

        &:hover {
            background-color: #f5f8ff;
        }
    }
`;

const Header: StyledInterface = styled.div`
    padding: 12px 12px 6px;
    display: flex;
    justify-content: space-between;
`;

const Title: StyledInterface = styled.div`
    font-size: 13px;
    font-weight: 700;
`;

const Contents: StyledInterface = styled.pre`
    padding: 6px 12px 12px;
    margin: 0;
`;

const DefaultDialog = forwardRef(
    ({ children, title, isShowClose, isOutSideClose, ...rest }, ref): JSX.Element => {
        const dialogRef = useRef<ref>(null);
        const [isShow, setIsShow] = useState<Boolean>(false);
        const [className, setClassName] = useState<string | null>("");

        useImperativeHandle(ref, () => ({ open, close }));

        useEffect(() => {
            clickOutSide(dialogRef, () => {
                if (isOutSideClose) close();
            });
        }, [dialogRef]);

        const open = (): void => {
            setIsShow(true);
            setClassName("show");
        };

        const close = (): void => {
            setIsShow(false);
            setClassName("hidden");
        };

        return (
            <Overlay isShow={isShow} isToggle={true}>
                <DialogWrapper>
                    <DialogBox ref={dialogRef} {...rest} className={className}>
                        <Header>
                            <Title>{title}</Title>
                            {isShowClose && <BsX onClick={close} className="close-btn" />}
                        </Header>
                        <Contents>{children}</Contents>
                    </DialogBox>
                </DialogWrapper>
            </Overlay>
        );
    }
);

export default DefaultDialog;
