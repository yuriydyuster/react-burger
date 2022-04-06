import React, {useContext, useState} from 'react';
import styles from "./ingredient-card.module.css";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {OrderContext} from "../services/app-context";

export interface IngredientCardProps  {
        _id?: string,
        name?: string,
        type?: string,
        proteins?: number,
        fat?: number,
        carbohydrates?: number,
        calories?: number,
        price:number,
        image: string,
        image_mobile?: string,
        image_large?: string,
        __v?: number,
        count: number}

function IngredientCard (props: IngredientCardProps) {

    const [isDetailsOpened, setStatus] = useState(false);
    const {orderList, setOrderList} = useContext(OrderContext);

    return (
        <>
            <div className={styles.ingredient_card}
                 onClick={() => setStatus(true)}

                 // Для тестирования и отладки добавление ингредиента в бургер вызыввается нажатием правой кнопки мыши
                 onContextMenu={(e) => {
                    // @ts-ignore
                     setOrderList([...orderList, props._id]);
                     e.preventDefault();
                     e.stopPropagation()
                 }
            }>
                {props.count!==0 && (<Counter count={props.count} size="default" />)}
                <img className={styles.card_image} src={props.image} alt={props.name}/>
                <div className={styles.card_price}>
                    <p className={styles.card_price}>{props.price}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <p className={styles.card_title}>{props.name}</p>
            </div>
            {isDetailsOpened && (
                <Modal title="Детали ингредиента" toClose={() => setStatus(false)}>
                    <IngredientDetails key={props._id + "_modal_details"} {...props}/>
                </Modal>)}
        </>
    );
}


export default IngredientCard;
