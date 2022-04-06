import React, { useEffect, useReducer} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { API_URL, IngredientsContext, OrderContext, PriceContext, getIngredientByID, isBunOrdered } from "../services/app-context";



function App() {

    const initialOrderList : string[] = [
        //'60d3b41abdacab0026a733c6',
        // '60d3b41abdacab0026a733d0',
        // '60d3b41abdacab0026a733cb',
        // '60d3b41abdacab0026a733d3',
        // '60d3b41abdacab0026a733d4',
        // '60d3b41abdacab0026a733cc',
        //'60d3b41abdacab0026a733c6'
    ];

    const [isLoading, setLoadingStatus] = React.useState(false);
    const [ingredients, setIngredients] = React.useState( []);
    const [totalPrice, setTotalPrice] = React.useState( );

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
        // @ts-ignore
        <IngredientsContext.Provider value={{ingredients, isLoading}}>
            <div className={styles.App}>
                <AppHeader/>
                {isLoading? <p>Loading...</p> : (
                <div className={styles.dashboard}>
                    {/*// @ts-ignore*/}
                    <OrderContext.Provider value={{orderList, orderListDispatcher, totalPrice, setTotalPrice}} >
                        <BurgerIngredients />
                        {/*// @ts-ignore*/}
                        <PriceContext.Provider value={{ totalPrice, setTotalPrice}} >
                            <BurgerConstructor />
                        </PriceContext.Provider>
                    </OrderContext.Provider>
                </div>)}
            </div>
        </IngredientsContext.Provider>
  );
}

export default App;
