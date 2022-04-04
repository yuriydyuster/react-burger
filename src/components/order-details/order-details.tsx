import React from "react";
import styles from "./order-details.module.css";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails (props: {
    orderID: string;
}) {

    return (
        <>
            <p className={styles.order_confirmation_id}>{props.orderID}</p>
            <p className={styles.order_confirmation_subtitle}>идентификатор заказа</p>
            <CheckMarkIcon type={'primary'}/>
            <p className={styles.order_confirmation_primary_test}>Ваш заказ начали готовить</p>
            <p className={styles.order_confirmation_secondary_test}>Дождитель заказа на орбитальной станции</p>
        </>
    )
}

export default OrderDetails;
