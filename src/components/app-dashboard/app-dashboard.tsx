import React from "react";
import styles from "./app-dashboard.module.css";

function AppDashboard (props : any) {
    return (
       <div className={styles.app_dashboard}>
           {props.children}
       </div>
    );
}

export default AppDashboard;
