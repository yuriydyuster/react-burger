import React, {useEffect} from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("portal_root");

function Modal (
    props: {
        children: React.ReactNode,
        toClose: () => void,
        title: string })
{
    useEffect( () => {
        function handleEscClose(e: KeyboardEvent) {
            // У меня не работает кнопка Esc, поэтому оттестировал функционал на других клавишах, нужное значение e.key
            // для Esc взял из документации, там нашлось 2 варианта...

            if ((e.key === "Escape") || (e.key === "Esc")) {
                props.toClose();
            }
        }

        document.addEventListener("keypress", handleEscClose, false)

        return () => document.removeEventListener("keypress", handleEscClose);

    }, []);
    return ReactDOM.createPortal(

        <ModalOverlay toClose={() => props.toClose()}>
            <div className={styles.modal}
                 onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h1 className={styles.title} >{props.title}</h1>
                    <CloseIcon type={"primary"} onClick={() => props.toClose()}/>
                </div>
                {props.children}
            </div>
        </ModalOverlay>,
    // @ts-ignore
    modalRoot);
}

export default Modal;
