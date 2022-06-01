import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Comment} from './../common/type';

type CommentsState = {
    comments: Comment[],
    loading: boolean,
    error: string | null   
};
type inputType = {
  comment: string,
  userId: string,
}
const initialState: CommentsState = {
    comments: [],
    loading: false,
    error: null
};

export const fetchComments = createAsyncThunk<Comment[], string, {rejectValue: string}>(
  "comments/fetchComments", async function (fetchDto, {rejectWithValue}) {
      const response = await fetch(`http://localhost:3001/posts/${fetchDto}/comments`);
      if(!response.ok) {
          return rejectWithValue("Server Error!")
      }
      
      const data = await response.json();
      return data;
  }
);

export const createAsyncComment = createAsyncThunk<
  Comment,
  {
    idArticle: string,
    input: inputType,
  },
  { rejectValue: string }
>("comments/createAsyncComments", async function (commentDto, { rejectWithValue }) {

  const response = await fetch(`http://localhost:3001/posts/${commentDto.idArticle}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(commentDto.input)
    
  });
  if(response.status === 401){
    return rejectWithValue("Unauthorized")
  }
  if (!response.ok) {
    return rejectWithValue("Server Error!");
  }

  const newComment = (await response.json()) as Comment
  return newComment;
});

const commentSlice = createSlice({
    name: "comments",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchComments.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.comments = action.payload
          state.loading = false
        })
        .addCase(createAsyncComment.pending, (state)=>{
          state.error = null
        })
        .addCase(createAsyncComment.rejected, (state, action)=>{
          if(action.payload === "Unauthorized"){
            state.error = action.payload;
          }else{
            state.error = null;
          }
        })
        .addCase(createAsyncComment.fulfilled, (state, action)=>{
          state.comments.unshift(action.payload)
        })
    }
  });
  
export default commentSlice.reducer;

  
