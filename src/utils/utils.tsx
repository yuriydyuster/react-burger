import {IngredientCardProps} from "../components/ingredient-card/ingredient-card";

export function getIngredientByID(ingredients: IngredientCardProps[], ingredientID: string | undefined) {
    return ingredients.find(
        (current: IngredientCardProps) => {
            return current._id === ingredientID
        });
}

export function isBunOrdered(ingredients: IngredientCardProps[], orderList: string[]): boolean {
    //Спасибо за наводку на some() и формат записи через ?.
    return orderList.some((item) => (getIngredientByID(ingredients, item)?.type === "bun"));
}
