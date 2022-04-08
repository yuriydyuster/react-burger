import React, { useEffect, useReducer} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientsContext, OrderContext, PriceContext} from "../../services/app-context";
import {API_URL} from "../../services/constants";
import {getIngredientByID, isBunOrdered} from "../../utils/utils";



function App() {

    const initialOrderList : string[] = [
    ];

    const [isLoading, setLoadingStatus] = React.useState(false);
    const [ingredients, setIngredients] = React.useState( []);
    const [totalPrice, setTotalPrice] = React.useState(0);

    function orderListReducer (state: string[], action: {type: string, ingredientID: string}) {
        const ingredient = getIngredientByID(ingredients, action.ingredientID);
        if (ingredient === undefined) {
            console.log("Ошибка! Ингридиент не найден!");
            console.log('ID: ', action.ingredientID);
            console.log(ingredients);
            return state;
        }
        const isItBun = (ingredient.type === "bun");
        const weHaveBun = isBunOrdered(ingredients, state);
        const isOrderNotAllowed = (isItBun && weHaveBun);
        switch (action.type) {
            case "order": {
                if (isOrderNotAllowed) {
                    console.log("Ошибка! Нельзя добавить еще одну булку! isBunOrdered:",isBunOrdered(ingredients, state) );
                    return state;
                } else {
                    console.log("Добавляю! isBunOrdered:",isBunOrdered(ingredients, state) );
                    return (
                        (isItBun && !weHaveBun) ? (
                            // Если нужно добавить первую булку, то добавляем в начало и конец массива заказа
                            [action.ingredientID, ...state, action.ingredientID] ) : (
                        (!isItBun && !weHaveBun) ? (
                            // Если нужно добавить НЕбулку в заказ, где еще нет булки, добавляем в начало
                            [action.ingredientID, ...state] ) : (
                            // В противном случае (НЕбулку добавляем к заказу, где уже есть булка),
                            // вставляем новый ингредиент наверх, ПОД верхнюю булку
                            [state[0], action.ingredientID, ...state.slice(1)]))
                )
                }
            }
            case "drop": {
                if (isItBun) {
                    console.log("Ошибка! Это странно, но нельзя (так кажется из макета) удалять булку!");
                    return state;
                } else {
                    const index = state.indexOf(action.ingredientID);
                    console.log("Удаляю ингридиент!");
                    return state.slice(0, index).concat(state.slice(index + 1));
                }
            }
            default : {
                console.log("Ошибка! Неизвестное действие!");
                return state;
            }
        }
    }

    const [orderList, orderListDispatcher] = useReducer(orderListReducer, initialOrderList);

    useEffect(() => {
        async function getIngredients() {
            setLoadingStatus(true);
            try {
                const res = await fetch(API_URL + 'ingredients');
                if (res.ok) {
                    const data = await res.json();
                    setIngredients(data.data);
                }
            }
            catch (e) {
                console.log(e)}
            setLoadingStatus(false);
        }
        getIngredients();
    }, []);




    return (
        <div className={styles.App}>
            <AppHeader/>
            {isLoading? <p>Loading...</p> : (
                <IngredientsContext.Provider value={{ingredients, isLoading}}>
                    <div className={styles.dashboard}>
                        <OrderContext.Provider value={{orderList, orderListDispatcher}} >
                            <BurgerIngredients />
                            <PriceContext.Provider value={{ totalPrice, setTotalPrice}} >
                                <BurgerConstructor />
                            </PriceContext.Provider>
                        </OrderContext.Provider>
                    </div>
                </IngredientsContext.Provider>
            )}
        </div>

  );
}

export default App;
