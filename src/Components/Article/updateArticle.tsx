import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Article } from "../../common/type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateAsyncArticle} from "../../store/articleSlice";
import addArticleStyle from './addArticle.module.css'

const UpdateArticle = () => {

    const { id } = useParams();
    const idArticle = id;

    const articles: Article[] = useAppSelector(state => state.articles.articles)
    const article: Article | undefined = articles.find(item => item.id === idArticle);
    const [link, setLink] = useState(article?.image);
    const [name, setName] = useState(article?.title);
    const [text, setText] = useState(article?.text);
    
    const navigate = useNavigate();
    const articleTheme = article?.type;
    const dispatch = useAppDispatch();

    const upgradeArticle = () => {
        if(idArticle && link && name && articleTheme && text){
          navigate("/" + article?.type+ "/article/" + idArticle);
    }
    else{return}
      
    }
  
    return (
        <div className={addArticleStyle.block}>
            <form className={addArticleStyle.flex}>
                <span>Добавить титульную картинку</span>
                <input type="text" value ={link} onChange={(e) => setLink(e.target.value)}></input>
                <span>Добавить название статьи</span>
                <input type="text" value ={name} onChange={(e) => setName(e.target.value)}></input>
                <span>Добавить содержание статьи</span>
                <textarea className= {addArticleStyle.text} cols={3000} rows = {15} value ={text} onChange={(e) => setText(e.target.value)}></textarea>
                
                <button type="button" className={addArticleStyle.addArticle} onClick={upgradeArticle}>Закончить статью</button>
            </form>
            
        </div>
    );
}

export default UpdateArticle;