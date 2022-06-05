import React, { useEffect } from "react";
import article from '../article.module.css';
import { Article } from "../../../common/type";
import { NavLink, useNavigate } from "react-router-dom";
import addArticle from "../AddArticle/addArticle.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { deleteAsyncArticle } from "../../../store/articleSlice"
import AddComment from "../../Comments/AddComments/addComment";
import Comments from "../../Comments/comment";
import { fetchComments } from "../../../store/commentSlice";

interface articleProps {
    article: Article;
}

const ArticleInfo = (props: articleProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector(state => state.auth.currentUser);
    const allComments = useAppSelector(state => state.comments.comments);

    const removeArticle = (id: string) => {
        dispatch(deleteAsyncArticle(id));
        navigate('/');
    }

    const RenderComments = () => {
        return allComments.map(com => {
            let user = com.user;
            return <Comments key={com.id} id={com.id} userName={user.login} text={com.comment} />
        })
    }
    useEffect(() => {
        dispatch(fetchComments(props.article.id));
    }, [])

    const deleteOrUpdate = () => {
        if(currentUser.login == "veloadmin55")
        return (<div className={addArticle.buttons}>
            <NavLink to={"/" + props.article.type + "/article/" + props.article.id + "/update"}>
                <button className={addArticle.addArticle}>Редактировать</button>
            </NavLink>
            <button className={addArticle.addArticle} onClick={() => removeArticle(props.article.id)}>Удалить статью</button>
        </div>)
    }
    return (
        <div className={article.block}>
            <div>
                <img src={props.article.image} className={article.headImg} />
                <h1>{props.article.title}</h1>
                <div className={article.text}>
                    <p>{props.article.text}</p>
                </div>
            </div>
            <div>
                <h1 >Отзывы</h1>
                <div>
                    {RenderComments()}
                </div>
                <AddComment artucleId={props.article.id} userId={currentUser.id} login={currentUser.login} />
            </div>
            {deleteOrUpdate()}
        </div>
    );
}

export default ArticleInfo;