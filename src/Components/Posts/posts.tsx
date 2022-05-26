import React from "react";
import { NavLink, useLocation, useNavigate} from "react-router-dom";
import { Article } from "../../common/type";
import { useAppSelector } from "../../hooks";
import ShortArticle from "../Article/shortArticle";
import post from './posts.module.css'


const Posts = () => {

    const articles: Article[] = useAppSelector(state => state.articles.articles)

    const location = useLocation();

    const theme = location.pathname.slice(1);

    const themeArticles: Article[] | undefined = articles.filter(item => item.theme === theme);

    return (
        <div>
            <NavLink to={"/add"}>
                <button className={post.addArticle}>Добавить статью</button>
            </NavLink>
            <div className={post.postsGrid}>
                {themeArticles.map(post => {return <ShortArticle article={post}/>})}
            </div>
        </div>
    );
}

export default Posts;
