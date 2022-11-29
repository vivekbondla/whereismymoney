import React, { useContext, useState } from "react";
import{NavLink}from 'react-router-dom'
import AuthContext from "../store/auth-context";
import './NavigationBar.css';

const NavigationBar = (props)=>{

    const authCtx = useContext(AuthContext)
    const userId = props.userId

    const [isMobileView , setIsMobileView] = useState(false)
    return (
        <div className="nav">
            <h3>whereismymoney!</h3>
            <div className={isMobileView ? "options-mobile":"options"}> 
             <NavLink to='/home'>Add Expense</NavLink>
             <NavLink   to={`/expense/${userId}}`}>View Expenses</NavLink>
             <button  onClick={authCtx.logout}> Logout</button>

            </div>
            <div className="hamburger" onClick={()=>{setIsMobileView(!isMobileView)}}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>

            </div>
        </div>
    )

}
export default NavigationBar ; 