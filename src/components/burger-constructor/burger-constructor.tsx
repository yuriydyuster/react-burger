import React, {useContext, useState} from "react";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import {IngredientCardProps} from "../ingredient-card/ingredient-card";
import OrderDetails from "../order-details/order-details";
import {IngredientsContext, OrderContext} from "../services/app-context";

function BurgerConstructor () {

    const [isConfirmationOpen, setConfirmationStatus] = useState(false);
    const {ingredients} = useContext(IngredientsContext);
    const {orderList, setOrderList} = useContext(OrderContext);

    let total = 0;
    orderList.forEach((item) => {
        // @ts-ignore
        let current = ingredients.find((i) => (i._id === item))
        // @ts-ignore
        if (current) total = total + current.price;
    });

    return (
    <>
        <div className={styles.burger_constructor}>
            <div className={styles.burger_slices}>

                {orderList.map((item: string, index: number, list: string[]) => {

                        const current = ingredients.find((i: IngredientCardProps) => (i._id === item));

                        const isTop = (index === 0);
                        const isBottom = (index === list.length-1);
                        const isLocked =  isTop || isBottom;
                        const type = isTop ? "top" : isBottom ? "bottom" : undefined;
                        const postfix = isTop ? " (верх)" : isBottom ? " (низ)" : "";

                        if ((current === undefined)) {
                            return ('');
                        } else {
                            console.log (current);


                            return (
                            <div className={styles.slice} key={"slice_" + index.toString()}>
                                <div className={styles.drag_tag} key={"slice_icon_" + index.toString()}>
                                    {!isLocked && <DragIcon type={"primary"}/>}
                                </div>

                                {/*// У меня есть проверка на определенность current, не понимаю почему TS не дает */}
                                {/*// использовать поля этого объекта ниже без TS ingore...*/}
                                <ConstructorElement key={"burger_elem_" + index.toString()}// @ts-ignore
                                                    text={current.name + postfix}// @ts-ignore
                                                    thumbnail={current.image}// @ts-ignore
                                                    price={current.price}// @ts-ignore
                                                    isLocked={isLocked}
                                                    type={type}
                                                    handleClose={() => {
                                                        let updatedOrderList = list.slice(0,index).concat(list.slice(index + 1));
                                                        // @ts-ignore
                                                        setOrderList(updatedOrderList);
                                                    }
                                                    }
                                />
                            </div>)
                        }
                    })
                }

            </div>

            <div className={styles.total}>
                <div>
                    <span>{total}</span><span><CurrencyIcon type={"primary"}/></span>
                </div>
                <Button type={"primary"} size={"large"} onClick={() => {setConfirmationStatus(true)}}>Оформить заказ</Button>

            </div>

        </div>
    {isConfirmationOpen && (
        <Modal title={""} toClose={() => {setConfirmationStatus(false)}}>
            <OrderDetails orderID={"034579"}/>
        </Modal>)}
</>)

}

export default BurgerConstructor;
