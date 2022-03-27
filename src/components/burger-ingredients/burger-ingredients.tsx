import React from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients (props : any) {
    return (
        <div className={styles.burger_ingredients}>
            <p className={styles.title}>
                Соберите бургер
                <IngredientsTabs/>
            </p>
        </div>
    );
}

const IngredientsTabs = () => {
    const [current, setCurrent] = React.useState('buns')
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

export default BurgerIngredients;
