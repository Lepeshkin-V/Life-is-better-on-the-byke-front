import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchArticles } from "../../store/articleSlice";
import ShortArticle from "../Article/shortArticle";
import post from './posts.module.css'


const PostsMain = () => {
    
    const dispatch = useAppDispatch();
    const articles = useAppSelector(state => state.articles.articles);

    useEffect(()=>{
        dispatch(fetchArticles())
      }, [])
    

    return (
        <div className = {post.block}>
            <div className={post.postsGrid}>
                {articles.map(post => {return <ShortArticle key={post.id} article={post}/>})}
            </div>
        </div>
    );
}

export default PostsMain;