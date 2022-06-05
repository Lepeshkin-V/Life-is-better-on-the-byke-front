import React from "react";
import shortArticle from './shortArticle.module.css'
import { NavLink } from "react-router-dom";
import { Article} from "../../../common/type";

interface articleProps {
    article: Article;
}

const ShortArticle = (props: articleProps) => {

    return (
        <NavLink to={`/${props.article.type}/article/${props.article.id}`} className = {shortArticle.navlink}>
            <div className = {shortArticle.shortArticleBlock}>
                <img src= {props.article.image} className={shortArticle.images} />
                <p className={shortArticle.name}>{props.article.title}</p>
            </div>
        </NavLink>
    );
}

export default ShortArticle;