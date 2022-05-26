import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Article } from "../../common/type";
import { useAppDispatch} from "../../hooks";
import { сreateArticle } from "../../store/articleSlice";
import addArticleStyle from './addArticle.module.css'

const AddArticle = () => {

    const [link, setLink] = useState("");
    const [name, setName] = useState("")
    const [text, setText] = useState("");
    
    const navigate = useNavigate();
    const theme = useLocation().pathname.slice(1);

    const dispatch = useAppDispatch();

    const addArticle = () => {

          const newArticle: Article = {
            id: new Date().toString(),
            titleImg: link,
            name: name,
            theme: theme,
            text: text
        }
  
          dispatch(сreateArticle(newArticle));
          setText('');
          navigate('/');
      
    }
  
    return (
        <div className={addArticleStyle.block}>
            <form className={addArticleStyle.flex}>
                <span>Добавить титульную картинку</span>
                <input type="text" value ={link} onChange={(e) => setLink(e.target.value)}></input>
                <span>Добавить название статьи</span>
                <input type="text" value ={name} onChange={(e) => setName(e.target.value)}></input>
                <span>Добавить содержание статьи</span>
                <textarea className= {addArticleStyle.text} cols={3000} rows = {12} value ={text} onChange={(e) => setText(e.target.value)}></textarea>
                <button type="button" className={addArticleStyle.addArticle} onClick={addArticle}>Закончить статью</button>
            </form>
            
        </div>
    );
}

export default AddArticle;