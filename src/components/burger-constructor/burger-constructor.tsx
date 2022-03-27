import React from "react";
import styles from "./burger-constructor.module.css";

function BurgerConstructor (props : any) {
    return (
        <div className={styles.burger_constructor}>
            {props.children}
        </div>
    );
}

export default BurgerConstructor;
