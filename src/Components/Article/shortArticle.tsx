import React from "react";
import shortArticle from './shortArticle.module.css'
import { NavLink } from "react-router-dom";
import { Article} from "../../common/type";

interface articleProps {
    article: Article;
}

const ShortArticle = (props: articleProps) => {

    return (
        <NavLink to={`/${props.article.theme}/article/${props.article.id}`} className = {shortArticle.navlink}>
            <div className = {shortArticle.shortArticleBlock}>
                <img src= {props.article.titleImg} className={shortArticle.images} />
                <p>{props.article.name}</p>
            </div>
        </NavLink>
    );
}

export default ShortArticle;