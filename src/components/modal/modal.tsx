import React from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("portal_root");

function Modal(props: any) {

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={() => props.toClose()}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <p className={styles.title} >{props.title}</p>
                    <CloseIcon type={"primary"} onClick={() => props.toClose()}/>
                </div>
                {props.children}
            </div>
        </div>,
        // @ts-ignore
    modalRoot);
}

export default Modal;
