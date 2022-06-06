import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ArticleInfo from "./ArticleInfo/articleInfo";
import articl from './article.module.css';
import { fetchArticles } from "../../store/articleSlice";


const ArticleList = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const articles = useAppSelector((state) => state.articles.articles);

    useEffect(()=>{
        dispatch(fetchArticles())
      }, [])
      
    const article = articles.find(item => item.id === id);
    if(!article){
        return <p>Article not found</p>
    }
    return (
        <div className={articl.block}>
            <ArticleInfo article = {article}/>
        </div>
    );
}

export default ArticleList;