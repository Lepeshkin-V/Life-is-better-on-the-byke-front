import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../Assets/img/logo.png'
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signOut } from "../../store/authSlice";
import header from './header.module.css';
import _ from "lodash";

const Header = () => {
  
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const dispatch = useAppDispatch()
  
    const exit = () => {
      dispatch(signOut())
    }
  
    const EntryExit = () => {
      if (_.isEmpty(currentUser)) {
        return (
            <NavLink to="/entry">
              <button>Вход</button>
            </NavLink>
        );
      }
      else{
        return (
            <button onClick={()=>exit()}>Выход</button>
        );
      }
    };
  

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
            <NavLink to={"/advice"}>
                <button>Советы</button>
            </NavLink>
            <NavLink to={"/training"}>
                <button>Тренировки</button>
            </NavLink>
            <NavLink to={"/repair"}>
                <button>Велоремонт</button>
            </NavLink>
            <EntryExit />
        </header>
    )
}

export default Header;