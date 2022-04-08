import React from 'react';
import styles from "./ingredient-details.module.css";
import {IngredientCardProps} from "../ingredient-card/ingredient-card";

function IngredientDetails (props: IngredientCardProps) {

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

    return(
        <>
            <img alt={props.name} className={styles.image} src={props.image_large}/>
            <p className={styles.title}>{props.name}</p>
            <div className={styles.nutrition_facts}>
                {nutritionFacts.map((element, index) => {

                    return (
                        <div className={styles.nutrition_element}
                            key={index}>
                            <p>{element.caption}</p>
                            {/*// @ts-ignore этот игнор никак не убирается (((*/}
                            <p className={styles.digits}>{props[element.type]?.toString() }</p>
                        </div>
                    )
                })}
            </div>
        </>
    );}

export default IngredientDetails;
