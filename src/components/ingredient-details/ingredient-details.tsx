import React from 'react';
import styles from "./ingredient-details.module.css";

function IngredientDetails (props: {
    _id?: string,
    name?: string,
    type?: string,
    proteins?: number,
    fat?: number,
    carbohydrates?: number,
    calories?: number,
    price?:number,
    image?: string,
    image_mobile?: string,
    image_large?: string,
    __v?: number }
) {

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
                {nutritionFacts.map((element) => {

                    return (
                        <div className={styles.nutrition_element}>
                            <p>{element.caption}</p>
                            {/*@ts-ignore*/}
                            <p className={styles.digits}>{props[element.type]}</p>
                        </div>
                    )
                })}
            </div>
        </>
    );}

export default IngredientDetails;
