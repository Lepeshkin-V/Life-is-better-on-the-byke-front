import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Comment, DeleteCommDto, User} from './../common/type';

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
  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }

  const newComment = (await response.json()) as Comment
  return newComment;
});

export const deleteAsyncComment = createAsyncThunk<
  string,
  {
    ids:  DeleteCommDto
  },
  { rejectValue: string }
>("comments/deleteAsyncComments", async function (deleteDto, { rejectWithValue }) {

  const response = await fetch(`http://localhost:3001/posts/${deleteDto.ids.postId}/comments/${deleteDto.ids.commentId}`,{
    method: 'DELETE',
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(deleteDto.ids.userId)
  });
  if (!response.ok) {
    return rejectWithValue(response.statusText);
  }

  return deleteDto.ids.commentId;
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
          state.comments.reverse()
          state.loading = false
        })
        .addCase(createAsyncComment.pending, (state)=>{
          state.error = null
        })
        .addCase(createAsyncComment.fulfilled, (state, action)=>{
          state.comments.unshift(action.payload)
        })
        .addCase(createAsyncComment.rejected, (state, action)=>{
          if(action.payload)
            state.error = action.payload;
        })
        .addCase(deleteAsyncComment.fulfilled, (state, action)=>{
          const index = state.comments.findIndex((comment) => comment.id === action.payload);
          if (index !== -1) {
            state.comments.splice(index, 1);
          }
        })
        .addCase(deleteAsyncComment.rejected, (state, action)=>{
          if(action.payload)
            state.error = action.payload;
        })
    }
  });
  
export default commentSlice.reducer;

  
