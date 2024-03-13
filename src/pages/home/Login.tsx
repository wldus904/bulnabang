import styled, { StyledInterface } from "styled-components";
import { useState } from "react";
import Button from "@/components/button/Button";
import TextBox from "@/components/input/TextBox";
import Password from "@/components/input/Password";
import MainIcon from "@/components/icon/MainIcon";
import { theme } from "@/styles/theme";
import { NextRouter, useRouter } from "next/router";

const LoginWrapper: StyledInterface = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
`;

const LoginBox: StyledInterface = styled.div`
    max-width: 300px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 4px #d6dbe4;
`;

const MainIconBox: StyledInterface = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const InputBox: StyledInterface = styled.div`
    input {
        &:first-child {
            margin-bottom: 5px;
        }
    }
`;

const WarningMsg: StyledInterface = styled.div`
    display: flex;
    align-items: center;
    min-height: 35px;
    color: ${theme.colors.error};
`;

const FindWrapper: StyledInterface = styled.div`
    text-align: center;
    margin-top: 10px;
`;

const Login = (): JSX.Element => {
    const router: NextRouter = useRouter();
    const [id, setId] = useState<string | null>("");
    const [pwd, setPwd] = useState<string | null>("");
    const [msg, setMsg] = useState<string | null>("");
    const [loading, setLoading] = useState<Boolean | null>(false);
    const finds: Array<{ name: string; url: string }> = [
        { name: "회원가입", url: "/home/registration" },
    ];

    const startLogin = (): void => {
        setLoading(true);
        setMsg("");

        // TODO user 정보 가져오기
        if (id === "test" && pwd === "test") {
            localStorage.setItem("user", "abcd1234");
            router.push("/main/dashboard");
        } else {
            setMsg("아이디 또는 비밀번호를 잘못 입력했습니다");
            setLoading(false);
        }
    };

    const move = (e: MouseEvent, url: string): void => {
        e.preventDefault();
        router.push(url);
    };

    return (
        <LoginWrapper>
            <LoginBox>
                <MainIconBox>
                    <MainIcon />
                </MainIconBox>
                <InputBox>
                    <TextBox
                        placeholder="아이디"
                        value={id}
                        width="98%"
                        onChange={(e) => setId(e.target.value)}
                        isSelect
                    />
                    <Password
                        placeholder="비밀번호"
                        value={pwd}
                        width="98%"
                        onChange={(e) => setPwd(e.target.value)}
                        isSelect
                    />
                </InputBox>
                <WarningMsg>{msg}</WarningMsg>
                <Button color="primary" loading={loading} onClick={startLogin}>
                    로그인
                </Button>
            </LoginBox>
            <FindWrapper>
                {finds.map((find) => {
                    return (
                        <a onClick={(e) => move(e, find.url)} key={find.url}>
                            {find.name}
                        </a>
                    );
                })}
            </FindWrapper>
        </LoginWrapper>
    );
};

export default Login;
