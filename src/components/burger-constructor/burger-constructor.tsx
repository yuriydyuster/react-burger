import React, {useEffect, useState} from "react";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon, Button, CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";

function BurgerConstructor (props : any) {

    const [isLoading, setLoadingStatus] = React.useState(false);
    const [ingredients, setIngredients] = React.useState({
        data: [],
        success: false,
    });
    const [isConfirmationOpen, setConfirmationStatus] = useState(false);

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

    let total = 0;

    return (
    <>
        <div className={styles.burger_constructor}>
            <div className={styles.burger_slices}>
                {isLoading ? "Загрузка..." :
                    props.orderList.map((item: string, index: number, list: []) => {

                        let current = ingredients.data.find((i: any) => (i._id === item));

                        let isTop = (index === 0);
                        let isBottom = (index === list.length-1);
                        let isLocked =  isTop || isBottom;
                        let type = isTop ? "top" : isBottom ? "bottom" : undefined;

                        if ((current === undefined)) {
                            return (<></>);
                        } else {
                            // @ts-ignore
                            total = total + current.price;
                            return (
                            <div className={styles.slice} key={index}>
                                <div className={styles.drag_tag}>
                                    {!isLocked && <DragIcon type={"primary"}/>}
                                </div>
                                <ConstructorElement key={index}// @ts-ignore
                                                    text={current.name} // @ts-ignore
                                                    thumbnail={current.image} // @ts-ignore
                                                    price={current.price} // @ts-ignore
                                                    isLocked={isLocked}// @ts-ignore
                                                    type={type}// @ts-ignore
                                                    handleClose={() => {
                                                        let updatedOrderList = list.slice(0,index).concat(list.slice(index + 1));
                                                        // console.log(updatedOrderList.length);
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
                <Button type={"primary"} size={"large"} onClick={() => {setConfirmationStatus(true)}}>Подтвердить заказ</Button>

            </div>

        </div>
    {isConfirmationOpen && <OrderConfirmation/>}
</>)

    function OrderConfirmation (props: any) {

        return (
            <Modal title={""} toClose={() => {setConfirmationStatus(false)}}>
                <p className={styles.order_confirmation_id}>034579</p>
                <p className={styles.order_confirmation_subtitle}>идентификатор заказа</p>
                <CheckMarkIcon type={'primary'}/>
                <p className={styles.order_confirmation_primary_test}>Ваш заказ начали готовить</p>
                <p className={styles.order_confirmation_secondary_test}>Дождитель заказа на орбитальной станции</p>
            </Modal>
                )
            }
}

export default BurgerConstructor;
