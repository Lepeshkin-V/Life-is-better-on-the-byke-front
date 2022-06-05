import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ShortArticle from "../Article/ShortArticle/shortArticle";
import post from './posts.module.css';
import { fetchArticles } from "../../store/articleSlice";

const Posts = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector(state => state.articles.articles);
    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const location = useLocation();
    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    const type = location.pathname.slice(1);

    const typeArticles = articles.filter(item => item.type === type) || [];

    const Theme = () => {
        if (type === "review")
            return "Обзоры"
        if (type === "cycling")
            return "Велоспорт"
        if (type === "advice")
            return "Советы"
        if (type === "training")
            return "Тренировки"
        if (type === "repair")
            return "Велоремонт"
    }


    const ButtonOrNo = () => {
        if (currentUser.login === 'veloadmin55') {
            return (
                <div className={post.block}>
                    <span className={post.theme}>{Theme()}</span>
                    <NavLink to={"/add/" + type}>
                        <button className={post.addArticle}>Добавить статью</button>
                    </NavLink>
                    <div className={post.postsGrid}>
                        {typeArticles.map(post => { return <ShortArticle key={post.id} article={post} /> })}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={post.block}>
                    <h1>{Theme()}</h1>
                    <div className={post.postsGrid}>
                        {typeArticles.map(post => { return <ShortArticle key={post.id} article={post} /> })}
                    </div>
                </div>
            );
        }
    }
    return (
        <ButtonOrNo />
    )
}

export default Posts;
