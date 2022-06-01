import React, { useEffect } from "react";
import { Article} from "../../common/type";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ArticleInfo from "./articleInfo";
import articl from './article.module.css';
import { fetchArticles } from "../../store/articleSlice";


const ArticleList = () => {

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const idArticle = id

    const articles = useAppSelector((state) => state.articles.articles);
    
    useEffect(()=>{
        dispatch(fetchArticles())
      }, [])
      
    const article = articles.find(item => item.id === idArticle);
    if(!article){
        return (<p>Article not found</p>);
    }else

    return (
        <div className={articl.block}>
            <ArticleInfo article = {article}/>
        </div>
    );
}

export default ArticleList;