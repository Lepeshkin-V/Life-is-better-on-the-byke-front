import React from "react";
import logo from '../../Assets/img/logo.png'

const Header = () => {
    return (
        <header className='header'>
            <img src={logo} />
            <span>Life is better on the bike</span>
            <a>Новости</a>
            <a>Велоспорт</a>
            <a>Советы</a>
            <a>Тренировки</a>
            <a>Велоремонт</a>
            <a>Профиль</a>
        </header>
    )
}

export default Header;