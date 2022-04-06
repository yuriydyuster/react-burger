import React, {useContext, useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "../ingredient-card/ingredient-card";
import {IngredientCardProps} from "../ingredient-card/ingredient-card";
import {IngredientsContext, OrderContext} from "../services/app-context";




function BurgerIngredients (props : {
    ingredientList: IngredientCardProps[],
    orderList: string[]
}) {



    return (
        <div className={styles.burger_ingredients}>
            <h1 className={styles.title}>
                Соберите бургер
            </h1>
            <IngredientsTabs
                initialTab={0}
                orderList={props.orderList}
                //ingredientList={props.ingredientList}
            />
        </div>
    );
}



const IngredientsTabs = (props: {
    initialTab: number,
    //ingredientList: IngredientCardProps[],
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
        document.location.href = "#"+current;
    }, [current]);

    const {ingredients, isLoading} = useContext(IngredientsContext);

    console.log(ingredients);

    return (
        isLoading ? (<></>) : (
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
                        <React.Fragment key={category.name}>
                            <h2 key={"title_of_" + category.name} id={category.value} className={styles.category_title} >{category.name}</h2>
                            <div key={"section_of_" + category.name} className={styles.category_section}>
                                {ingredients
                                    .filter((ingredient : IngredientCardProps) => (ingredient.type === category.value))
                                    .map((ingredient : IngredientCardProps) => {

                                        return (<IngredientCard
                                            key={ingredient._id} // @ts-ignore
                                            count={props.orderList.filter((i: string) => {return (i === ingredient._id)}).length}
                                            {...ingredient}/>
                                        )
                                    })}
                            </div>
                        </React.Fragment>
                    )
                })}

            </div>

        </>)
    )
}
export default BurgerIngredients;
