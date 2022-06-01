import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector} from "../../hooks";
import { createAsyncArticle } from "../../store/articleSlice";
import addArticleStyle from './addArticle.module.css'

const AddArticle = () => {

    const [link, setLink] = useState("");
    const [name, setName] = useState("")
    const [text, setText] = useState("");
    const error = useAppSelector(state => state.articles.error);
    const navigate = useNavigate();
    const {type} = useParams();
    console.log(type);
    const themeArticle = useLocation().pathname.slice(5);

    const dispatch = useAppDispatch();
    const addArticle = () => {
          dispatch(createAsyncArticle({image:link, title: name, type: themeArticle, text:text}));
          setText('');
          setName('');
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