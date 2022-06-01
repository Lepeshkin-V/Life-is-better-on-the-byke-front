import React from "react";
import comment from "./comment.module.css";


interface CommentsProps {
    userName: string,
    text: string,
}
const Comments = (props: CommentsProps) => {
    
    return (
        <div className={comment.com}>
            <span className={comment.word}>{props.userName}</span>
            <p className={comment.textcom}>{props.text}</p>
        </div>
    );
}

export default Comments;