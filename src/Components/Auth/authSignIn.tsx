import _ from "lodash";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInDto } from "../../common/type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signIn } from "../../store/authSlice";
import auth from './auth.module.css'

const Auth = () => {

    const dispatch =useAppDispatch();
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const currentUser = useAppSelector(state => state.auth.currentUser);

    useEffect(()=>{if (!_.isEmpty(currentUser)) {
        navigate('/');
       }})
    

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

        const {meta, payload} = await dispatch(signIn(data))
        if(meta.requestStatus === 'rejected' && payload === "Unauthorized"){
            setError('Ошибка авторизации, проверьте вводимые данные');
            return error;
        }
        else if (meta.requestStatus === 'rejected') {
            setError("Ошибка авторизации, попробуйте позже");
            return error
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
                    <span>{error}</span>
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