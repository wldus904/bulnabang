// valid: 유효할 경우 true return
export const required = <T>(value: T): Boolean => {
    if (Array.isArray(value)) return value.length !== 0;
    else return value !== "" && value !== undefined && value !== null;
};

export const passwordValidator = (value: string): Boolean => {
    // 최소 8자의 소문자, 특수 문자(!@#$%^&*()) 및 숫자를 하나 이상 포함
    const reg = /(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()]).{8,}/;
    return reg.test(value);
};

export const phoneNumberValidator = (value: string): Boolean => {
    const reg = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    return reg.test(value);
};

export const emailValidator = (value: string): Boolean => {
    const reg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(value));
};
