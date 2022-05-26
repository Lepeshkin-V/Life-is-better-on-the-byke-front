import React from "react";
import { Article} from "../../common/type";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import ArticleInfo from "./articleInfo";


const ArticleList = () => {

    const { id } = useParams();
    
    const idArticle = id

    const articles: Article[] = useAppSelector(state => state.articles.articles)

    const article: Article | undefined = articles.find(item => item.id === idArticle);
    if (!article){
        return <div>Article not found</div>;
    }


    return (
        <div>
            <ArticleInfo article = {article}/>
        </div>
    );
}

export default ArticleList;