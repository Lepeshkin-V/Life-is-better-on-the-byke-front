import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInDto } from "../../common/type";
import { useAppDispatch } from "../../hooks";
import { signIn } from "../../store/authSlice";
import auth from './auth.module.css'

const Auth = () => {

    const dispatch =useAppDispatch();
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const entry = async () => {
        setError('')
        if(!login.trim() || !password.trim()) {
            setError('login и пароль не должны быть пустыми');
            return error;
        }

        const data: signInDto = {
          login: login,
          password: password
        }

        const {meta} = await dispatch(signIn(data))
        if(meta.requestStatus === 'rejected'){
            setError('Неверный login или пароль');
            return error;
        }
        else {
          setError('')
          navigate('/')
        }
    }


    return (
        <div>
            <h1>Вход</h1>
            <div className={auth.block}>

                <form className={auth.flex}>
                    <span>Логин</span>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}></input>
                    <span>Пароль</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="button" className={auth.entry} onClick = {() => entry()}>Войти</button>
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