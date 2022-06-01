import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Arguments, InputType } from "../../common/type";
import { useAppDispatch } from "../../hooks";
import { createAsyncComment } from "../../store/commentSlice";
import comment from "./comment.module.css";

interface CreateCommentProps {
    artucleId: string,
    userId: string,
    login: string
}

const AddComment = (props: CreateCommentProps) => {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();
    
    const addComment = () =>{
        const input: InputType = {
            comment:text,
            userId:props.userId,
            login: props.login
        }
        const argument: Arguments = {
            input:input,
            idArticle:props.artucleId
        }
        dispatch(createAsyncComment(argument));
        setText("");
    }

    return (
        <div>
            <form className= {comment.add}>
                <span className={comment.word}>Оставить отзыв</span>
                <textarea className={comment.text} onChange={(e) => setText(e.target.value)}></textarea>
                <button type="button" className={comment.addComment} onClick={addComment}>Отправить</button>
            </form>
        </div>
    );
}

export default AddComment;
