import React from 'react';
import {Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import HeaderMenuItem from "../header-menu-item/header-menu-item";
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.left_menu}>
                    <HeaderMenuItem title='Конструктор' link={'#'} isInactive={false}>
                        <BurgerIcon type={"primary"}/>
                    </HeaderMenuItem>
                    <HeaderMenuItem title='Лента заказов' link={'#'} isInactive={true}>
                        <ListIcon type={"secondary"}/>
                    </HeaderMenuItem>
                </div>
                <div className={styles.center_logo}>
                    <Logo/>
                </div>
                <div className={styles.right_menu}>
                <HeaderMenuItem title='Личный кабинет' link={'#'} isInactive={true}>
                    <ProfileIcon type={"secondary"}/>
                </HeaderMenuItem>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;
