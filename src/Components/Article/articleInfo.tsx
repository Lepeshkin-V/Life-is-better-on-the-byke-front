import React from "react";
import article from './article.module.css';
import { Article } from "../../common/type";
import { NavLink, useNavigate } from "react-router-dom";
import addArticle from "./addArticle.module.css";
import { useAppDispatch } from "../../hooks";
import {deleteArticle} from "../../store/articleSlice"
interface articleProps {
    article: Article;
}

const ArticleInfo = (props: articleProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const removeArticle = (id: string) => {
        dispatch(deleteArticle(id));
        navigate('/');
}

    return (
        <div>
            <div className= {article.block}>
                <img src={props.article.titleImg} className={article.headImg} />
                <h1>{props.article.name}</h1>
                <p className = {article.text}>{props.article.text}</p>
            </div>
            <div className= {addArticle.buttons}>
                <NavLink to = {"/" + props.article.theme + "/article/" + props.article.id + "/update"}>
                    <button className= {addArticle.addArticle}>Редактировать</button>
                </NavLink>
                <button className= {addArticle.addArticle} onClick = {() => removeArticle(props.article.id)}>Удалить статью</button>
            </div> 
        </div>
    );
}

export default ArticleInfo;