import React, { Children } from "react"
import { NavLink } from "react-router-dom";
import ShortArticle from "../Article/shortArticle";
import content from './сontent.module.css'

type props = React.HTMLAttributes<HTMLDivElement>;


const Content = ({ children }: props) => {
    return (
        <div className={content.content}>
                <main>{children}</main>
        </div>
    );
}

export default Content;