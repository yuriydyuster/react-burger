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
            <IngredientsTabs initialTab={0}/>

        </div>
    );

}

const IngredientsTabs = (props: any) => {
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

    console.log(categories);



    const [current, setCurrent] = React.useState(categories[props.initialTab].value);
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
    }, []);


    return (
        <>
            <div style={{display: 'flex'}}>
                {categories.map((item, index) => {
                    return (
                        <Tab key={index} value={item.value} active={current === item.value} onClick={setCurrent}>
                            {item.name}
                        </Tab>
                    )
                })}

                {/*<Tab value="bun" active={current === 'bun'} onClick={setCurrent}>*/}
                {/*    Булки*/}
                {/*</Tab>*/}
                {/*<Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>*/}
                {/*    Соусы*/}
                {/*</Tab>*/}
                {/*<Tab value="main" active={current === 'main'} onClick={setCurrent}>*/}
                {/*    Начинки*/}
                {/*</Tab>*/}

            </div>

            <div className={styles.catalogue}>

                {categories.map((category, categoryIndex) => {
                    return (
                        <>
                            <p id={category.value} className={styles.category_title} >{category.name}</p>
                            <div className={styles.category_section}>
                                {isLoading ? 'Загрузка...' : ingredients.data
                                    .filter((ingredient : any, index, array) => (ingredient.type === category.value))
                                    .map((ingredient : any, index, array) => {
                                        return (<IngredientCard
                                            key={index}
                                            {...ingredient}/>
                                        )
                                    })}
                            </div>
                        </>
                    )
                })}


            {/*    <p id="bun" className={styles.category_title} >Булки</p>*/}
            {/*    <div className={styles.category_section}>*/}
            {/*        {isLoading ? 'Загрузка...' : ingredients.data*/}
            {/*            .filter((item : any, index, array) => (item.type === "bun"))*/}
            {/*            .map((item : any, index, array) => {*/}
            {/*                return (<IngredientCard key={index} price={item.price} name={item.name} image={item.image}/>)*/}
            {/*            })}*/}
            {/*    </div>*/}

            {/*    <p id="sauce" className={styles.category_title} >Соусы</p>*/}
            {/*    <div className={styles.category_section}>*/}
            {/*        {isLoading ? 'Загрузка...' : ingredients.data*/}
            {/*            .filter((item : any, index, array) => (item.type === "sauce"))*/}
            {/*            .map((item : any, index, array) => {*/}
            {/*                return (<IngredientCard key={index} price={item.price} name={item.name} image={item.image}/>)*/}
            {/*            })}*/}
            {/*    </div>*/}

            {/*    <p id="main" className={styles.category_title}>Начинки</p>*/}
            {/*    <div className={styles.category_section}>*/}
            {/*        {isLoading ? 'Загрузка...' : ingredients.data*/}
            {/*            .filter((item : any, index, array) => (item.type === "main"))*/}
            {/*            .map((item : any, index, array) => {*/}
            {/*                return (<IngredientCard key={index} price={item.price} name={item.name} image={item.image}/>)*/}
            {/*            })}*/}
            {/*    </div>*/}
            </div>

        </>)

}
export default BurgerIngredients;
