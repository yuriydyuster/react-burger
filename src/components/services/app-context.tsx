import React from 'react';
import {IngredientCardProps} from "../ingredient-card/ingredient-card";

export const API_URL = 'https://norma.nomoreparties.space/api/';

export const IngredientsContext = React.createContext({
    ingredients: [],
    isLoading: false
});


export const OrderContext = React.createContext({
    orderList: [],
    orderListDispatcher: undefined
});

export const PriceContext = React.createContext({
    totalPrice: 0,
    setTotalPrice: undefined
});

export function getIngredientByID (ingredients: IngredientCardProps[], ingredientID: string | undefined) {
    // не понятно что за беда...
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const {ingredients, isLoading} = useContext(IngredientsContext);
    return ingredients.find(
        (current: IngredientCardProps) => {
            return current._id  === ingredientID});
}

export function isBunOrdered (ingredients: IngredientCardProps[], orderList: string[]) : boolean {

    let result = false;
    orderList.forEach((item) => {
        const current = getIngredientByID(ingredients, item);
        if (current) result = result || (current.type === "bun");
    })

    return result
}

