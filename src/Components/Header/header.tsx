import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../Assets/img/logo.png'
import header from './header.module.css'

const Header = () => {
    return (
        <header className={header.header}>
            <img src={logo} alt="logo" />
            <h1 className={header.motto}>Life is better on the bike</h1>
            <NavLink to={""}>
                <button>Главная</button>
            </NavLink>
            <NavLink to={"/review"}>
                <button>Обзоры</button>
            </NavLink>
            <NavLink to={"/cycling"}>
                <button>Велоспорт</button>
            </NavLink>
            <NavLink to={"/tips"}>
                <button>Советы</button>
            </NavLink>
            <NavLink to={"/training"}>
                <button>Тренировки</button>
            </NavLink>
            <NavLink to={"/repair"}>
                <button>Велоремонт</button>
            </NavLink>
            <NavLink to={"/entry"}>
                <button>Вход</button>
            </NavLink>
        </header>
    )
}

export default Header;