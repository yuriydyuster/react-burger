import React from 'react';

export const IngredientsContext = React.createContext({
    ingredients: [],
    isLoading: false
});


export const OrderContext = React.createContext({
    orderList: [],
    setOrderList: undefined
});
