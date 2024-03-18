import React from "react";
import Link from "next/link";
import styled, { StyledInterface } from "styled-components";
import MainIcon from "../icon/MainIcon";
import MenuButton from "../button/MenuButton";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";

const MenuWrapper: StyledInterface = styled.div`
    display: flex;
    font-size: 12px;
`;
const MenuContents: StyledInterface = styled.nav`
    // display: flex;
    // flex-direction: column;
    padding: 20px;
`;

const Menu = (props): JSX.Element => {
    const router: NextRouter = useRouter();
    let [currentPath, setCurrentPath] = useState<string | null>(router.pathname);
    const menus = [
        { name: "Data upload", url: "/dataUpload" },
        { name: "Data table", url: "/dataTable" },
    ];

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname]);

    const move = (e: MouseEvent, url: string): void => {
        e.preventDefault();
        router.push(url);
    };

    useEffect(() => {
        router.events.on("routeChangeComplete", () => {
            setCurrentPath(router.pathname);
        });
    });

    return (
        <MenuWrapper>
            <MainIcon />
            <MenuContents>
                {menus.map((menu) => {
                    return (
                        <MenuButton
                            key={menu.url}
                            href={menu.url}
                            currentPath={currentPath}
                            onClick={(e) => move(e, menu.url)}
                        >
                            {menu.name}
                        </MenuButton>
                    );
                })}
            </MenuContents>
        </MenuWrapper>
    );
};

export default Menu;
