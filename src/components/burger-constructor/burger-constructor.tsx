import React, { useState} from "react";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import {IngredientCardProps} from "../ingredient-card/ingredient-card";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor (props : {
    ingredients: IngredientCardProps[],
    orderList: string[],
    reConstructBurger: (updatedOrderList: string[]) => void
}) {

    const [isConfirmationOpen, setConfirmationStatus] = useState(false);

    let total = 0;
    props.orderList.forEach((item) => {
        let current = props.ingredients.find((i) => (i._id === item))
        // @ts-ignore
        if (current) total = total + current.price;
    });

    return (
    <>
        <div className={styles.burger_constructor}>
            <div className={styles.burger_slices}>

                {props.orderList.map((item: string, index: number, list: string[]) => {

                        const current = props.ingredients.find((i: IngredientCardProps) => (i._id === item));

                        const isTop = (index === 0);
                        const isBottom = (index === list.length-1);
                        const isLocked =  isTop || isBottom;
                        const type = isTop ? "top" : isBottom ? "bottom" : undefined;
                        const postfix = isTop ? " (верх)" : isBottom ? " (низ)" : "";

                        if ((current === undefined)) {
                            return (<></>);
                        } else {

                            return (
                            <div className={styles.slice} key={index}>
                                <div className={styles.drag_tag}>
                                    {!isLocked && <DragIcon type={"primary"}/>}
                                </div>
                                <ConstructorElement key={index}// @ts-ignore
                                                    text={current.name + postfix} // @ts-ignore
                                                    thumbnail={current.image} // @ts-ignore
                                                    price={current.price} // @ts-ignore
                                                    isLocked={isLocked}// @ts-ignore
                                                    type={type}// @ts-ignore
                                                    handleClose={() => {
                                                        let updatedOrderList = list.slice(0,index).concat(list.slice(index + 1));
                                                        // console.log(updatedOrderList.length);
                                                        // @ts-ignore
                                                        props.reConstructBurger(updatedOrderList);
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
