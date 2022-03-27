import React from 'react';
import styles from './header-menu-item.module.css';


function HeaderMenuItem (props: any) {
    return (
        <a className={styles.menu_item} href={props.link}>
            <div className={styles.menu_item_icon}>
                {props.children}
            </div>
            <div className={props.isInactive ? styles.menu_item_title_inactive : styles.menu_item_title}>
                {props.title}
            </div>
        </a>
    );
};

export default HeaderMenuItem;
