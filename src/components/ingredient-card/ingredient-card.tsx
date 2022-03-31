import React, {useState} from 'react';
import styles from "./ingredient-card.module.css";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";

function IngredientCard (props: any
    // _id: string,
    // name: string,
    // type: string,
    // proteins: number,
    // fat: number,
    // carbohydrates: number,
    // calories: number,
    // price:number,
    // image: string,
    // image_mobile: string,
    // image_large: string,
    // __v: number }
    ) {

    const [count, setCount] = useState(0);
    const [isDetailsOpened, setStatus] = useState(false);


    const modal = (
        <Modal title="Детали ингредиента" toClose={() => setStatus(false)}>
            <p>{props.name}</p>
        </Modal>
    );

    return (
        <>
            <div className={styles.ingredient_card} onClick={(e) => setStatus(true)}>
                {count!==0 && (<Counter count={count} size="default" />)}
                <img className={styles.card_image} src={props.image} alt={props.name}/>
                <div className={styles.card_price}>
                    <p className={styles.card_price}>{props.price}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <p className={styles.card_title}>{props.name}</p>
            </div>
            {isDetailsOpened && modal}
        </>
    );


}


export default IngredientCard;
