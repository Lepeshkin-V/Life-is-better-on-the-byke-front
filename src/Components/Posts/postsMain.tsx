import React from "react";
import { Article } from "../../common/type";
import { useAppSelector } from "../../hooks";
import ShortArticle from "../Article/shortArticle";
import post from './posts.module.css'


const PostsMain = () => {

    const articles: Article[] = useAppSelector(state => state.articles.articles)

    return (
        <div>
            <div className={post.postsGrid}>
                {articles.map(post => {return <ShortArticle article={post}/>})}
            </div>
        </div>
    );
}

export default PostsMain;