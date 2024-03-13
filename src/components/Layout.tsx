import React, { ReactNode, useRef, useState, useEffect } from "react";
import Head from "next/head";
import Header from "./layout/Header";
import SideMenu from "./layout/SideMenu";
import Footer from "./layout/Footer";
import {
    LayoutWrapper,
    OverLay,
    LayoutBox,
    SideMenuBox,
    MainBox,
    Contents,
} from "@/styles/layout.ts";
import { theme } from "@/styles/theme";

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = "BULNABANG" }: Props) => {
    const [isShow, setIsShow] = useState<Boolean>(false);
    // const [windowSize, setWindowSize] = useState<Array<Number>>([
    //     window.innerWidth,
    //     window.innerHeight,
    // ]);

    // useEffect(() => {
    //     const handleWindowResize = () => {
    //         setWindowSize([window.innerWidth, window.innerHeight]);
    //         if (windowSize[0] > theme.deviceSizes.tablet) setIsShow(true);
    //     };

    //     window.addEventListener("resize", handleWindowResize);
    //     handleWindowResize();

    //     return () => {
    //         window.removeEventListener("resize", handleWindowResize);
    //     };
    // }, []);

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <LayoutWrapper>
                <OverLay onClick={() => setIsShow(false)} className={isShow ? "on" : ""}></OverLay>
                <SideMenuBox className={isShow ? "on" : ""}>
                    <SideMenu toggleMenu={() => setIsShow(!isShow)} />
                </SideMenuBox>
                <Header toggleMenu={() => setIsShow(!isShow)} />
                <LayoutBox>
                    <MainBox>
                        <Contents className={isShow ? "on" : ""}>{children}</Contents>
                        <Footer />
                    </MainBox>
                </LayoutBox>
            </LayoutWrapper>
        </div>
    );
};

export default Layout;
