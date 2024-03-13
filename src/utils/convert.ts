export const convertDateFormat = (date: string | Date, pattern?: string = null) => {
    const dateString: string = typeof date === "string" ? date : date.toISOString();
    const splitDate: string = dateString.split("T")[0];
    return pattern ? splitDate.replaceAll("-", pattern) : splitDate;
};

export const convertDayOfWeek = (date: string | Date, isFullName?: Boolean = false) => {
    const day: Number = typeof date === "number" ? date : date.getDay();
    const week: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
    const suffix: string = isFullName ? "요일" : "";
    return week[day] + suffix;
};
