import React, {useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "../ingredient-card/ingredient-card";

function BurgerIngredients (props : any) {


    return (
        <div className={styles.burger_ingredients}>
            <p className={styles.title}>
                Соберите бургер
            </p>
            <IngredientsTabs initialTab={"buns"}/>

        </div>
    );

}

const IngredientsTabs = (props: any) => {
    const [current, setCurrent] = React.useState(props.initialTab);
    useEffect(() => {
        console.log(current);
        document.location.href = "#"+current;
    }, [current]);

    const [isLoading, setLoadingStatus] = React.useState(false);
    const [ingredients, setIngredients] = React.useState({
        data: [],
        success: false,
    });

    useEffect(() => {
        const getIngredients = async () => {
            setLoadingStatus(true);
            const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
            if (res.ok) {
                const data = await res.json();
                setIngredients(data);
            }
            setLoadingStatus(false);
        }
        getIngredients();
    }, [])


    return (
        <>
            <div style={{display: 'flex'}}>
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

            <div className={styles.catalogue}>

                <p id="buns" className={styles.category_title} >Булки</p>
                <div className={styles.category_section}>
                    {isLoading ? 'Загрузка...' : ingredients.data
                        .filter((item : any, index, array) => (item.type === "bun"))
                        .map((item : any, index, array) => {
                            return (<IngredientCard key={index} price={item.price} name={item.name} image={item.image}/>)
                        })}
                </div>

                <p id="sauces" className={styles.category_title} >Соусы</p>
                <div className={styles.category_section}>
                    {isLoading ? 'Загрузка...' : ingredients.data
                        .filter((item : any, index, array) => (item.type === "sauce"))
                        .map((item : any, index, array) => {
                            return (<IngredientCard key={index} price={item.price} name={item.name} image={item.image}/>)
                        })}
                </div>

                <p id="fillings" className={styles.category_title}>Начинки</p>
                <div className={styles.category_section}>
                    {isLoading ? 'Загрузка...' : ingredients.data
                        .filter((item : any, index, array) => (item.type === "main"))
                        .map((item : any, index, array) => {
                            return (<IngredientCard key={index} price={item.price} name={item.name} image={item.image}/>)
                        })}
                </div>
            </div>

        </>)

}
export default BurgerIngredients;
