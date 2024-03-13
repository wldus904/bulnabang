// _app.tsx 다음으로 실행
// _document.tsx파일에 css를 미리 적용해야 css가 로딩되면서 늦게 깜빡이는 현상이 발생하지 않음
// html은 SSR로 미리 rendering되지만 styled component의 스타일들은 사용자가 접속시 변환되기 때문
// pages폴더 내부에 존재하는 모든 페이지에 global한 설정값을 제공
import { Fragment } from "react";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    <Fragment key="1">
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </Fragment>,
                ],
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
