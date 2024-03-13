import { useState, useRef, useEffect } from "react";
import styled, { StyledInterface } from "styled-components";
import { BsCalendarEvent } from "react-icons/bs";
import { convertDateFormat } from "@/utils/convert.ts";
import Calendar from "./Calendar";
import { clickOutSide } from "@/utils/event.ts";
import { theme } from "@/styles/theme";

const DatePickerWrapper: StyledInterface = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    &.invalid {
        border-bottom: 1px solid ${theme.colors.error};
    }
`;

const DatePickerBox: StyledInterface = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    cursor: pointer;
`;

const DateValueBox: StyledInterface = styled.span`
    margin: 10px;
    font-weight: 500;
`;

const Placeholder: StyledInterface = styled.span`
    margin: 10px;
    color: #e6e6e6;
`;

const CalendarBox: StyledInterface = styled.div`
    @keyframes fade-in-dropdown-animation {
        0% {
            transform: scale(0);
        }

        100% {
            transform: scale(1);
        }
    }

    @keyframes fade-out-dropdown-animation {
        0% {
            transform: scale(1);
        }

        100% {
            transform: scale(0);
        }
    }
    position: absolute;
    width: 300px;
    height: 300px;
    top: 25px;
    left: 0;
    animation: fade-out-dropdown-animation 0.4s ease;
    animation-fill-mode: forwards;
    transform-origin: ${(props) => props.aligns};

    &.on {
        animation: fade-in-dropdown-animation 0.4s ease;
    }
`;

const DatePicker = (props): JSX.Element => {
    const calendarRef = useRef<ref>(null);
    const [showDate, setShowDate] = useState<string | null>(null);
    const [isShowCalendar, setIsShowCalendar] = useState<Boolean>(false);
    const [isValid, setIsValid] = useState<Boolean>(true);
    const currentDate: string = convertDateFormat(new Date(), ".");

    useEffect(() => {
        clickOutSide(calendarRef, () => {
            setIsShowCalendar(false);
        });
    }, [calendarRef]);

    const checkValid = (): void => {
        let res: Boolean = true;

        props.rules.forEach((validator) => {
            if (!validator(showDate)) res = false;
        });

        setIsValid(res);
        props.setValid(res);
    };

    useEffect(checkValid, [isShowCalendar]);

    const setValue = (value): void => {
        setShowDate(value);
        props.setValue(value);
        setIsShowCalendar(false);
    };

    return (
        <DatePickerWrapper ref={calendarRef} className={isValid ? "" : "invalid"}>
            <DatePickerBox onClick={() => setIsShowCalendar(!isShowCalendar)}>
                <BsCalendarEvent />
                {showDate ? (
                    <DateValueBox>{showDate}</DateValueBox>
                ) : (
                    <Placeholder>{props.placeholder}</Placeholder>
                )}
            </DatePickerBox>
            <CalendarBox aligns={props.aligns} className={isShowCalendar ? "on" : ""}>
                <Calendar
                    currentDate={currentDate}
                    setValue={setValue}
                    className="calendar"
                ></Calendar>
            </CalendarBox>
        </DatePickerWrapper>
    );
};

export default DatePicker;
