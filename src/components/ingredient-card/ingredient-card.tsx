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
    const nutritionFacts = [
    {
        type: "calories",
        caption: "Калории,ккал"
    }, {
        type: "proteins",
        caption: "Белки, г"
    }, {
        type: "fat",
        caption: "Жиры, г"
    }, {
        type: "carbohydrates",
        caption: "Углеводы, г"
    },
    ];


    function IngredientDetails () {

    return(
        <Modal title="Детали ингредиента" toClose={() => setStatus(false)}>
            <img className={styles.modal_image} src={props.image_large}/>
            <p className={styles.modal_title}>{props.name}</p>
            <div className={styles.modal_nutrition_facts}>
                {nutritionFacts.map((element, index) => {
                    return (
                        <div className={styles.modal_nutrition_element}>
                            <p>{element.caption}</p>
                            <p className={styles.digits}>{props[element.type]}</p>
                        </div>
                    )
                })}
            </div>

        </Modal>
    );}

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
            {isDetailsOpened && <IngredientDetails/>}
        </>
    );
}


export default IngredientCard;
