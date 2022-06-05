import _ from "lodash";
import React, { useState } from "react";
import { Arguments, InputType } from "../../../common/type";
import { useAppDispatch, useAppSelector} from "../../../hooks";
import { signOut } from "../../../store/authSlice";
import { createAsyncComment } from "../../../store/commentSlice";
import comment from "../comment.module.css";

interface CreateCommentProps {
    artucleId: string,
    userId: string,
    login: string
}

const AddComment = (props: CreateCommentProps) => {
    const currentUser = useAppSelector(state => state.auth.currentUser)
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const dispatch = useAppDispatch();

    const addComment = async () =>{
        if(_.isEmpty(currentUser)){
            setText("");
            setError("Только зарегистрированные пользователи могут оставлять отзывы")
            return 
        }
        const input: InputType = {
            comment:text,
            userId:props.userId,
            login: props.login
        }
        const argument: Arguments = {
            input:input,
            idArticle:props.artucleId
        }
        
        const {meta, payload} = await dispatch(createAsyncComment(argument))
        
        if(meta.requestStatus === "rejected" && payload === "Unauthorized"){
            setError("Время сессии вышло, пожалуйста авторизуйтесь снова");
            dispatch(signOut());
            return
        }else {
            setText("");
        }
    }

    return (
        <div>
            <form className= {comment.add}>
                <span className={comment.word}>Оставить отзыв</span>
                <span>{error}</span>
                <textarea className={comment.text} value = {text} onChange={(e) => setText(e.target.value)}></textarea>
                <button type="button" className={comment.addComment} onClick={addComment}>Отправить</button>
            </form>
        </div>
    );
}

export default AddComment;
