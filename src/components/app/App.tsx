import React, {useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


function App() {
    const [orderList, setOrderList] = useState([
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733d0',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733d3',
        '60d3b41abdacab0026a733d4',
        '60d3b41abdacab0026a733cc',
        '60d3b41abdacab0026a733c6'
    ]);

    return (
        <>
            <div className={styles.App}>
                <AppHeader/>
                <div className={styles.dashboard}>
                    <BurgerIngredients/>
                    <BurgerConstructor orderList={orderList} reConstructBurger={setOrderList}/>
                </div>
            </div>
        </>
  );
}

export default App;
