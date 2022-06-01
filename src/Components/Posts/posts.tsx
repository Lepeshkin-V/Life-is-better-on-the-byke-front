import React, { useEffect } from "react";
import { NavLink, useLocation} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ShortArticle from "../Article/shortArticle";
import post from './posts.module.css';
import { fetchArticles } from "../../store/articleSlice";

const Posts = () => {
    const dispatch = useAppDispatch();
    const articles = useAppSelector(state => state.articles.articles);
    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const location = useLocation();
    useEffect(()=>{
        dispatch(fetchArticles())
      }, [])
      
    const type = location.pathname.slice(1);

    const typeArticles = articles.filter(item => item.type === type) || [];
      

const ButtonOrNo = () => {
    if(currentUser.login === 'veloadmin55'){
        return (
            <div className={post.block}>
                <NavLink to={"/add/" + type}>
                    <button className={post.addArticle}>Добавить статью</button>
                </NavLink>
                <div className={post.postsGrid}>
                    {typeArticles.map(post => {return <ShortArticle key={post.id} article={post}/>})}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={post.block}>
                <div className={post.postsGrid}>
                    {typeArticles.map(post => {return <ShortArticle key={post.id} article={post}/>})}
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
