import { useState, useEffect } from "react";
import styled, { StyledInterface } from "styled-components";
import SelectBox from "../input/SelectBox";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const CalendarWrapper: StyledInterface = styled.div`
    display: inline-block;
    background-color: #fff;
    box-shadow: 0 0 4px #d0d5dc;
    width: 100%;
    height: 100%;
    padding: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const CalendarHeader: StyledInterface = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    svg {
        cursor: pointer;
        margin: 0 8px;
    }
`;

const SelectBoxWrapper: StyledInterface = styled.span`
    margin: 5px;
`;

const Year: StyledInterface = styled.span`
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    margin: 0 5px;
`;

const Month: StyledInterface = styled.span`
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    margin: 0 5px;
`;

const DateTable: StyledInterface = styled.table`
    width: 100%;
    // height: 100%;
`;
const DateHead: StyledInterface = styled.thead``;
const DateBody: StyledInterface = styled.tbody``;
const DayRow: StyledInterface = styled.tr``;
const WeekRow: StyledInterface = styled.tr``;
const DayCol: StyledInterface = styled.td`
    font-weight: 600;
    text-align: center;
    vertical-align: center;
`;
const DateCol: StyledInterface = styled.td`
    text-align: center;
    vertical-align: center;
`;
const DateBox: StyledInterface = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;

    &:hover {
        background-color: #ffefef;
    }

    &.today {
        box-shadow: 0 0 0 1px #ef5350 inset;
    }

    &.active {
        background-color: #ef5350;
        color: #fff;
    }

    &.disabled {
        color: #dbdbdb;
    }
`;

const _PREV_SIGN: Number = -1;
const _NEXT_SIGN: Number = 1;

const Calendar = (props): JSX.Element => {
    let today: Date = new Date(props.currentDate);
    const days: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
    let [calendarDates, setCalendarDates] = useState<Array<[]>>([]);
    const [selectedYear, setSelectedYear] = useState<Number | null>(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<string | null>(
        (today.getMonth() + 1).toString().padStart(2, "0")
    );
    const [selectedDate, setSelectedDate] = useState<Number | null>(today.getDate());
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [years, setYears] = useState<Array<Number>>([]);
    const [months, setMonths] = useState<Array<string>>([]);

    useEffect(() => {
        const date: Date = new Date();
        const pushYears: Array<Number> = [];
        const pushMonths: Array<String> = [];

        for (let year = date.getFullYear() - 100; year <= date.getFullYear() + 100; year++) {
            pushYears.push(year);
        }

        for (let month = 1; month <= 12; month++) {
            pushMonths.push(month.toString().padStart(2, "0"));
        }

        setYears(pushYears);
        setMonths(pushMonths);

        updateCalendarDates();
    }, []);

    const isToday = (year: Number, month: Number, date: Number): Boolean => {
        return (
            year === today.getFullYear() && month === today.getMonth() && date === today.getDate()
        );
    };

    const updateCalendarDates = (updateDate: string | null = null) => {
        const prevDate: Date = updateDate ? new Date(updateDate) : new Date();
        prevDate.setDate(1);
        prevDate.setMonth(prevDate.getMonth());
        prevDate.setDate(0);

        const currentDate: Date = updateDate ? new Date(updateDate) : new Date();
        setSelectedYear(currentDate.getFullYear());
        setSelectedMonth((currentDate.getMonth() + 1).toString().padStart(2, "0"));
        currentDate.setDate(1);
        let firstDay: Number = currentDate.getDay();
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(0);
        let lastDate: Number = currentDate.getDate();

        const calendar: Array<[]> = [];
        let week: [] = [];

        const setCalendar = (): void => {
            calendar.push(week);
            week = [];
        };

        for (let date = firstDay; date > 0; date--) {
            week.push({
                value: prevDate.getDate() - date + 1,
                isActive: false,
                today: isToday(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate()),
            });
        }

        if (week.length === 7) setCalendar();

        for (let date = 1; date <= lastDate; date++) {
            week.push({
                value: date,
                isActive: true,
                today: isToday(currentDate.getFullYear(), currentDate.getMonth(), date),
            });

            if (week.length === 7) setCalendar();

            if (date === lastDate) {
                const pushWeek: [] = [];
                let lastPushDate: Number = null;

                for (let pushDate = 0; pushDate < 7 - week.length; pushDate++) {
                    pushWeek.push({
                        value: pushDate + 1,
                        isActive: false,
                        today: isToday(
                            currentDate.getFullYear(),
                            currentDate.getMonth() + 1,
                            pushDate + 1
                        ),
                    });
                }

                lastPushDate = 7 - week.length;
                week = [...week, ...pushWeek];
                setCalendar();

                if (calendar.length < 6) {
                    for (
                        let remainingWeek: Number = 0;
                        remainingWeek < 6 - calendar.length;
                        remainingWeek++
                    ) {
                        for (let pushDate = lastPushDate; pushDate < lastPushDate + 7; pushDate++) {
                            week.push({
                                value: pushDate + 1,
                                isActive: false,
                                today: isToday(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth() + 1,
                                    pushDate + 1
                                ),
                            });
                        }
                        setCalendar();
                    }
                }
            }
        }

        setCalendarDates(calendar);
    };

    const updateMonth = (SIGN: Number): void => {
        const prevDate: Date = new Date(`${selectedYear}-${selectedMonth}-01`);
        prevDate.setMonth(prevDate.getMonth() + SIGN);
        const prevDateTxt: string = prevDate.toISOString().split("T")[0];
        updateCalendarDates(prevDateTxt);
    };

    const selectDate = (node, date): void => {
        if (!date.isActive) return;
        setSelectedDate(date.value);
        setSelectedNode(node);
        props.setValue(
            `${selectedYear}.${selectedMonth}.${date.value.toString().padStart(2, "0")}`
        );
    };

    const getDateClass = (node, date): string => {
        let className: string = "";

        if (selectedNode === node) className = "active";
        if (!date.isActive) className = "disabled";
        if (date.today) className += " today";

        return className;
    };

    return (
        <CalendarWrapper>
            <CalendarHeader>
                <BsChevronLeft onClick={() => updateMonth(_PREV_SIGN)} />
                <Year>
                    <SelectBoxWrapper>
                        <SelectBox
                            name="year"
                            options={years}
                            value={selectedYear}
                            onChange={(e) => {
                                updateCalendarDates(`${e.target.value}-${selectedMonth}-01`);
                            }}
                        ></SelectBox>
                    </SelectBoxWrapper>
                    년
                </Year>
                <Month>
                    <SelectBoxWrapper>
                        <SelectBox
                            name="month"
                            options={months}
                            value={selectedMonth}
                            onChange={(e) => {
                                updateCalendarDates(
                                    `${selectedYear}-${e.target.value
                                        .toString()
                                        .padStart(2, "0")}-01`
                                );
                            }}
                        ></SelectBox>
                    </SelectBoxWrapper>
                    월
                </Month>
                <BsChevronRight onClick={() => updateMonth(_NEXT_SIGN)} />
            </CalendarHeader>
            <DateTable>
                <DateHead>
                    <WeekRow>
                        {days.map((day, dayIdx) => {
                            return <DayCol key={day}>{day}</DayCol>;
                        })}
                    </WeekRow>
                </DateHead>
                <DateBody>
                    {calendarDates.map((week, weekIdx) => {
                        return (
                            <WeekRow key={`week-${weekIdx}`}>
                                {week.map((date, dateIdx) => {
                                    return (
                                        <DateCol key={`${weekIdx}-${date.value}`}>
                                            <DateBox
                                                onClick={() =>
                                                    selectDate(`${weekIdx}-${date.value}`, date)
                                                }
                                                className={getDateClass(
                                                    `${weekIdx}-${date.value}`,
                                                    date
                                                )}
                                            >
                                                {date.value}
                                            </DateBox>
                                        </DateCol>
                                    );
                                })}
                            </WeekRow>
                        );
                    })}
                </DateBody>
            </DateTable>
        </CalendarWrapper>
    );
};

export default Calendar;
