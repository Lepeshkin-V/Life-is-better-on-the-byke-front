import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { Article, ArticleDto} from './../common/type';

type ArticlesState = {
    articles: Article[],
    loading: boolean,
    error: string | null   
};

const initialState: ArticlesState = {
    articles: [],
    loading: false,
    error: null
};

export const fetchArticles = createAsyncThunk<Article[], undefined, {rejectValue: string}>(
    "articles/fetchArticles", async function (_, {rejectWithValue}) {
        const response = await fetch("http://localhost:3001/posts");

        if(!response.ok) {
            return rejectWithValue("Server Error!")
        }
        
        const data = await response.json();
        return data;
    }
);

export const createAsyncArticle = createAsyncThunk<
  Article,
  ArticleDto,
  { rejectValue: string }
>("articles/createAsyncArticles", async function (artilcleDto, { rejectWithValue }) {

  const response = await fetch("http://localhost:3001/posts",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(artilcleDto)
  });
  if(response.status === 401){
    return rejectWithValue("Unauthorized")
  }
  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const newArticle = (await response.json()) as Article
  return newArticle;
});

export const updateAsyncArticle = createAsyncThunk<
  Article,
  {
    id: string,
    input: ArticleDto
  },
  { rejectValue: string }
>("articles/updateAsyncArticles", async function (artilcleDto, { rejectWithValue }) {

  const response = await fetch(`http://localhost:3001/posts/${artilcleDto.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(artilcleDto.input)
  });
  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }
 
  const newArticle = (await response.json()) as Article

  return newArticle;
});

export const deleteAsyncArticle = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("posts/deleteAsyncPost", async function (id, { rejectWithValue }) {

  const response = await fetch(`http://localhost:3001/posts/${id}`,{
    method: 'DELETE',
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  return id;
});


const articleSlice = createSlice({
    name: "articles",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchArticles.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchArticles.fulfilled, (state, action) => {
          state.articles = action.payload
          state.articles.reverse()
          state.loading = false
        })
        
        .addCase(createAsyncArticle.pending, (state)=>{
          state.error = null
        })
        .addCase(createAsyncArticle.rejected, (state, action)=>{
          if(action.payload === "Unauthorized"){
            state.error = action.payload;
          }else{
            state.error = null;
          }
        })
        .addCase(createAsyncArticle.fulfilled, (state, action)=>{
          state.articles.unshift(action.payload)
        })
        .addCase(updateAsyncArticle.pending, (state)=>{
          state.error = null
        })
        .addCase(updateAsyncArticle.fulfilled, (state, action)=>{
          const index = state.articles.findIndex((article) => article.id === action.payload.id);
          if (index !== -1){
          state.articles[index] = action.payload;
          }
        })
        .addCase(deleteAsyncArticle.fulfilled, (state, action)=>{
          const index = state.articles.findIndex((article) => article.id === action.payload);
          if (index !== -1) {
            state.articles.splice(index, 1);
          }
        })
    }
  });
  
export default articleSlice.reducer;

  
