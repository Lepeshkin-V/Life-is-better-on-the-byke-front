import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DeleteCommDto } from "../../common/type";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchArticles } from "../../store/articleSlice";
import { signOut } from "../../store/authSlice";
import { deleteAsyncComment } from "../../store/commentSlice";
import comment from "./comment.module.css";


interface CommentsProps {
    id: string,
    userName: string,
    text: string,
}
const Comments = (props: CommentsProps) => {

    const [error, setError] = useState("");
    const currentUser = useAppSelector(state => state.auth.currentUser);
    const dispatch = useAppDispatch();
    const post = useParams();

    const ids: DeleteCommDto = {
        postId: post.id||"",
        commentId: props.id,
        userId: currentUser.id,
    }

    const del = async (ids: DeleteCommDto) => {
       const {meta, payload} = await dispatch(deleteAsyncComment({ids}));
       if(meta.requestStatus === "rejected" && payload === "Unauthorized"){
        setError("Время сессии вышло, пожалуйста авторизуйтесь снова");
        dispatch(signOut());
        return
    }
    }

    const ButtonDelete = () => {
        
        if(currentUser.login === props.userName || currentUser.login === 'veloadmin55'){
        return (
        <button className={comment.delButton} onClick = {() => del(ids)}>X</button>
        )}else
        return
    }

    return (
        <div className={comment.com}>
            <div className={comment.del}>
                <span className={comment.word}>{props.userName}</span>
                  {ButtonDelete()}
            </div>
            <p className={comment.textcom}>{props.text}</p>
            <span>{error}</span>
        </div>
    );
}

export default Comments;