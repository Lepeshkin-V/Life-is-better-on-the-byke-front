import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import auth from './auth.module.css'

const Auth = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")


    return (
        <div>
            <h1>Вход</h1>
            <div className={auth.block}>

                <form className={auth.flex}>
                    <span>Логин</span>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}></input>
                    <span>Пароль</span>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="button" className={auth.entry} >Войти</button>
                </form>
                <span>Нет учетной записи?</span>
                <NavLink to={'/registration'}>
                    <button type="button" className={auth.entry} >Зарегистрироваться</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Auth;