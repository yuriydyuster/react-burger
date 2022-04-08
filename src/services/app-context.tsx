import React from 'react';
import {IngredientCardProps} from "../components/ingredient-card/ingredient-card";


export const IngredientsContext = React.createContext<{
        ingredients: Array<IngredientCardProps>,
        isLoading: boolean,
}>
    ({
        ingredients: new Array<IngredientCardProps>(0),
        isLoading: true,
    });


export const OrderContext = React.createContext<{
        orderList: Array<string>,
        orderListDispatcher: Object,
}>
    ({
            orderList: new Array<string>(0),
            orderListDispatcher: Object,
    });


export const PriceContext = React.createContext<{
        totalPrice: number,
        setTotalPrice: Object,
}>
    ({
            totalPrice: 0,
            setTotalPrice: Object
    });

