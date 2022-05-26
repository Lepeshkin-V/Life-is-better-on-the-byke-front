import { createSlice } from '@reduxjs/toolkit';
import { Article} from './../common/type';
import {articles} from '../common/data'


type ArticlesState = {
    articles: Article[];
}

const initialState: ArticlesState = {
    articles: articles,
};

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {

        сreateArticle(state, action) {
            state.articles.unshift(action.payload)
        },
        
        deleteArticle(state, action) {
            const index = state.articles.findIndex(article => article.id === action.payload);
            if (index !== -1){
              state.articles.splice(index, 1)

            }
        },

        updateArticle(state, action) {
            const index = state.articles.findIndex(article => article.id === action.payload.id);
            if (index !== -1) {
                state.articles[index].titleImg = action.payload.titleImg;
                state.articles[index].name = action.payload.name;
                state.articles[index].text = action.payload.text;

            }
        }
    }
})

export const {сreateArticle, deleteArticle, updateArticle} = articleSlice.actions;

export default articleSlice.reducer;

  
