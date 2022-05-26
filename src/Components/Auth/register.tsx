import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import reg from './auth.module.css'
const Registration = () => {


    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    
    return (
        <div>
            <h1>Регистрация</h1>
        <div className={reg.block}>
            <form className={reg.flex}>
                <span>Логин</span>
                <input type="text" value ={login} onChange={(e) => setLogin(e.target.value)}></input>
                <span>Пароль</span>
                <input type="text" value ={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="button" className={reg.entry} >Зарегистрироваться</button>
            </form>
            <span>У вас уже есть аккаунт?</span>
            <NavLink to={'/entry'}>
            <button type="button" className={reg.entry} >Войти</button>
            </NavLink>
        </div>
        </div>
    );
}

export default Registration;