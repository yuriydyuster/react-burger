import React from 'react';
import AppHeader from "../app-header/app-header";
import styles from "./App.module.css";
import AppDashboard from "../app-dashboard/app-dashboard";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";



function App() {
  return (
      <div className={styles.App}>
          <AppHeader/>
          <AppDashboard>
              <BurgerIngredients/>
              <BurgerConstructor/>
          </AppDashboard>

      </div>
  );
}

export default App;
