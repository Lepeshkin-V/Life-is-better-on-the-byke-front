import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpDto } from "../../common/type";
import { useAppDispatch } from "../../hooks";
import { signUp } from "../../store/authSlice";
import reg from './auth.module.css'
const Registration = () => {
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const registration = async () => {
        setError('')
        if (!login.trim() || !password.trim()) {
            setError('Все поля должны быть заполнены')
            return
        }

        const data: signUpDto = {
            login: login,
            password: password,
        }

        const { meta, payload } = await dispatch(signUp(data))

        if (meta.requestStatus === 'rejected'&& payload === "Forbidden") {
            setError("Логин уже используется");
            return error
        }
        else if (meta.requestStatus === 'rejected') {
            setError("Ошибка регистрации, попробуйте позже");
            return error
        }
        else {
            setError('')
            navigate('/entry')
        }
    }



    return (
        <div>
            <h1>Регистрация</h1>
            <div className={reg.block}>
                <form className={reg.flex}>
                    <span>Логин</span>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}></input>
                    <span>Пароль</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <span>{error}</span>
                    <button type="button" className={reg.entry}  onClick={() =>registration()}>Зарегистрироваться</button>
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