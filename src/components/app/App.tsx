import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


function App() {
    const apiServer = 'https://norma.nomoreparties.space/api/';

    const [orderList, setOrderList] = useState([
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733cc',
        '60d3b41abdacab0026a733c6'
    ]);

    const [isLoading, setLoadingStatus] = React.useState(false);
    const [ingredients, setIngredients] = React.useState({
        data: [],
        success: false,
    });

    useEffect(() => {
        const getIngredients = async () => {
            setLoadingStatus(true);
            const res = await fetch(apiServer + 'ingredients' );
            if (res.ok) {
                const data = await res.json();
                setIngredients(data);
            }
            setLoadingStatus(false);
        }
        try {getIngredients()}
        catch (e) {console.log(e)}

    }, []);


    return (
        <>
            <div className={styles.App}>
                <AppHeader/>
                {isLoading? <p>Loading...</p> : (
                <div className={styles.dashboard}>
                    <BurgerIngredients ingredientList={ingredients.data} orderList={orderList}/>
                    <BurgerConstructor orderList={orderList} reConstructBurger={setOrderList} ingredients={ingredients.data}/>
                </div>)}
            </div>
        </>
  );
}

export default App;
