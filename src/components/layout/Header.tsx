import styled, { StyledInterface } from "styled-components";
import { theme } from "@/styles/theme";
import { BsList, BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import Button from "@/components/button/Button";
import Menu from "./Menu";
import { NextRouter, useRouter } from "next/router";

const HeaderBox: StyledInterface = styled.header`
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 20px);
    height: 70px;
    padding: 0 10px;
    top: 0;
    background-color: #fff;
    z-index: 1;

    .side-menu-btn {
        display: none;

        @media ${theme.device.tablet} {
            display: inline-block;
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
    }

    .user-icon-btn {
        width: 28px;
        height: 28px;
        color: #5a6a85;
        cursor: pointer;
    }
`;

const MenuWrapper: StyledInterface = styled.div`
    display: inline-block;

    @media ${theme.device.tablet} {
        display: none;
    }
`;

const UserMenuWrapper: StyledInterface = styled.div`
    position: fixed;
    top: 55px;
    right: 25px;
    width: 200px;
    max-height: 150px;
    z-index: 1;
    overflow-y: auto;
    box-shadow: 0 0 4px #d6dbe4;
    background-color: #fff;
    opacity: 0;
    transition: 0.2s ease-in-out;
    transform-origin: 0 0;
    transform: scaleY(0);

    &.on {
        opacity: 1;
        transform: scaleY(1);
    }
`;

const UserMenuList: StyledInterface = styled.ul`
    list-style: none;
    padding: 0 10px;
`;

const UserMenu: StyledInterface = styled.li`
    &:not(:last-child) {
        border-bottom: 1px solid #fff;
    }
`;

const Header = (props): JSX.Element => {
    const router: NextRouter = useRouter();
    const [isShowUserMenu, setIsShowUserMenu] = useState<Boolean>(false);

    const logout = (): void => {
        localStorage.removeItem("user");
        router.push("/home/login");
    };

    return (
        <HeaderBox>
            <MenuWrapper>
                <Menu />
            </MenuWrapper>
            <BsList onClick={() => props.toggleMenu()} className="side-menu-btn" />
            {/* <BsPersonCircle
                onClick={() => setIsShowUserMenu(!isShowUserMenu)}
                className="user-icon-btn"
            ></BsPersonCircle> */}
            <UserMenuWrapper className={isShowUserMenu ? "on" : ""}>
                <UserMenuList>
                    <Button onClick={logout} txtColor="#2a3547" color="#fff">
                        로그아웃
                    </Button>
                </UserMenuList>
            </UserMenuWrapper>
        </HeaderBox>
    );
};

export default Header;
