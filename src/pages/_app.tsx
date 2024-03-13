// 모든 페이지에 공통적으로 적용될 내용 작성 (_app.tsx를 따로 만들어 주지 않으면 내장된 로직 실행)
// 서버로부터 요청이 왔을 때 가장 먼저 실행
// 페이지에 적용할 공통 레이아웃 설정
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";

import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

export default MyApp; // next.js에서 export default 안해주면 error발생
