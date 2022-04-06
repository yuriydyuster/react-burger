import React, {useContext, useState} from "react";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import {IngredientCardProps} from "../ingredient-card/ingredient-card";
import OrderDetails from "../order-details/order-details";
import {API_URL, IngredientsContext, OrderContext, PriceContext, getIngredientByID} from "../services/app-context";

function BurgerConstructor () {

    const [isConfirmationOpen, setConfirmationStatus] = useState(false);
    const [isSendingOrder, setOrderingStatus] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    const {ingredients} = useContext(IngredientsContext);
    const {orderList, orderListDispatcher} = useContext(OrderContext);
    const {totalPrice, setTotalPrice} = useContext(PriceContext);

    async function sendOrder() {
        setOrderingStatus(true);
        try {
            const res = await fetch(API_URL + 'orders', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients : orderList
                })
            });
            if (res.ok) {
                const data = await res.json();
                setOrderNumber(data.order.number);
                setOrderingStatus(false);
                console.log('Order N: ', orderNumber);
                console.log(data);
            } else {
                console.log("Что-то пошло не так!");
                console.log(res.json());
                setOrderNumber(null);
                setOrderingStatus(false);
            }
        }
        catch (e) {
            console.log(e)}
        setOrderingStatus(false);
    }

    let total = 0;
    orderList.forEach((item) => {
        const current = getIngredientByID(ingredients, item);
        // @ts-ignore
        if (current) total = total + current.price;
    });

    // @ts-ignore
    setTotalPrice(total);
    console.log(total);

    return (
    <>
        <div className={styles.burger_constructor}>
            {orderList.length === 0 ? <p>Добавьте ингредиент нажатием ПРАВОЙ кнопки мыши.</p> :
            <div className={styles.burger_slices}>

                {orderList.map((item: string, index: number, list: string[]) => {

                    const current = ingredients.find((i: IngredientCardProps) => (i._id === item));
                    const isTop = (index === 0);
                    const isBottom = (index === list.length-1);
                    const type = isTop ? "top" : isBottom ? "bottom" : undefined;
                    const postfix = isTop ? " (верх)" : isBottom ? " (низ)" : "";

                    if ((current === undefined)) {
                        return ('');
                    } else {
                        // @ts-ignore
                        const isLocked =  (isTop || isBottom) && (current.type === "bun");
                        //console.log (current);
                        return (
                        <div className={styles.slice} key={"slice_" + index.toString()}>
                            <div className={styles.drag_tag} key={"slice_icon_" + index.toString()}>
                                {!isLocked && <DragIcon type={"primary"}/>}
                            </div>

                            {/*// У меня есть проверка на определенность current, не понимаю почему TS не дает */}
                            {/*// использовать поля этого объекта ниже без TS ingore...*/}
                            <ConstructorElement
                                key={"burger_elem_" + index.toString()}// @ts-ignore
                                text={current.name + postfix}// @ts-ignore
                                thumbnail={current.image}// @ts-ignore
                                price={current.price}// @ts-ignore
                                isLocked={isLocked}
                                type={type}
                                handleClose={() => {
                                    //let updatedOrderList = list.slice(0,index).concat(list.slice(index + 1));
                                    // @ts-ignore
                                    //setOrderList(updatedOrderList);
                                    orderListDispatcher({type: "drop", ingredientID: current._id});
                                }
                                }
                            />
                        </div>)
                    }
                })
                }

            </div>}

            <div className={styles.total}>
                <div>
                    <span>{totalPrice}</span><span><CurrencyIcon type={"primary"}/></span>
                </div>
                <Button
                    type={"primary"}
                    size={"large"}
                    onClick={() => {
                        sendOrder();
                        setConfirmationStatus(true)
                    }}
                >
                    Оформить заказ
                </Button>

            </div>

        </div>
    {isConfirmationOpen && (
        <Modal title={""} toClose={() => {setConfirmationStatus(false)}}>
            {isSendingOrder ? <p>Секундочку...</p> : orderNumber? <OrderDetails orderID={orderNumber}/> : <h1>ERROR</h1>}
        </Modal>)}
</>)

}

export default BurgerConstructor;
