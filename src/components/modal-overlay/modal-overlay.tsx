import React from "react";
import styles from "./modal-overlay.module.css";
import ReactDOM from "react-dom";

function ModalOverlay (
    props: {
        children: React.ReactNode,
        toClose: () => void
    })
{


    return (
        <div className={styles.overlay} onClick={() => props.toClose()}>
            {props.children}
        </div>
        )
}

export default ModalOverlay;
