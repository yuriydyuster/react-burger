import React, {useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "../ingredient-card/ingredient-card";
import {IngredientCardProps} from "../ingredient-card/ingredient-card";


function BurgerIngredients (props : {
    ingredientList: IngredientCardProps[],
    orderList: string[]
}) {

    return (
        <div className={styles.burger_ingredients}>
            <h1 className={styles.title}>
                Соберите бургер
            </h1>
            <IngredientsTabs initialTab={0} orderList={props.orderList} ingredientList={props.ingredientList}/>
        </div>
    );
}

const IngredientsTabs = (props: {
    initialTab: number,
    ingredientList: IngredientCardProps[],
    orderList: string[]
}) => {
    const categories = [{
        value: "bun",
        name: "Булки"
    }, {
        value: "sauce",
        name: "Соусы"
    }, {
        value: "main",
        name: "Начинки"}
    ];

    const [current, setCurrent] = React.useState(categories[props.initialTab].value);
    useEffect(() => {
        console.log(current);
        document.location.href = "#"+current;
    }, [current]);


    return (
        <>
            <div style={{display: 'flex'}}>
                {categories.map((item) => {
                    return (
                        <Tab key={item.value} value={item.value} active={current === item.value} onClick={setCurrent}>
                            {item.name}
                        </Tab>
                    )
                })}

            </div>

            <div className={styles.catalogue}>

                {categories.map((category) => {
                    return (
                        <>
                            <h2 key={"title_of_" + category.name} id={category.value} className={styles.category_title} >{category.name}</h2>
                            <div key={"section_of_" + category.name} className={styles.category_section}>
                                {props.ingredientList
                                    .filter((ingredient : IngredientCardProps) => (ingredient.type === category.value))
                                    .map((ingredient : IngredientCardProps) => {

                                        return (<IngredientCard
                                            key={ingredient._id} // @ts-ignore
                                            count={props.orderList.filter((i: string) => {return (i === ingredient._id)}).length}
                                            {...ingredient}/>
                                        )
                                    })}
                            </div>
                        </>
                    )
                })}

            </div>

        </>)

}
export default BurgerIngredients;
