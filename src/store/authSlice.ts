import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUpDto,
  signInDto,
  User,
  SignResponse,
  UsersState,
} from "../common/type";

const initialState: UsersState = {
    currentUser: JSON.parse(localStorage.getItem("user") || "{}"),
    loading: false,
    error: null,
    token: localStorage.getItem("token") || "",
  };
  
  export const signIn = createAsyncThunk<
    SignResponse,
    signInDto,
    { rejectValue: string }
  >("authUser/signIn", async function (dto, { rejectWithValue }) {
    const response = await fetch("https://life-is-beter-on-the-bike.herokuapp.com/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
  
    if (!response.ok) {
      return rejectWithValue(response.statusText);
    }
  
    const data: SignResponse = await response.json();
    localStorage.setItem("token", data.jwtToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  });
  
  export const signUp = createAsyncThunk<
    SignResponse,
    signUpDto,
    { rejectValue: string }
  >("authUser/signUp", async function (dto, { rejectWithValue }) {
    const response = await fetch("https://life-is-beter-on-the-bike.herokuapp.com/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
  
    if (!response.ok) {
      return rejectWithValue(response.statusText);
    }
  
    const data: SignResponse = await response.json();
    localStorage.setItem("token", data.jwtToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  });
  
  const authSlice = createSlice({
    name: "authUser",
    initialState: initialState,
    reducers: {
      signOut(state) {
        localStorage.clear();
        state.currentUser = {} as User;
        state.token = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(signIn.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signIn.fulfilled, (state, action) => {
          state.error = null;
          state.currentUser = action.payload.user;
          state.token = action.payload.jwtToken;
          state.loading = false;
        })
        .addCase(signIn.rejected, (state, action) => {
          if(action.payload)
            state.error = action.payload;
          state.loading = false;
        })
        .addCase(signUp.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signUp.fulfilled, (state, action) => {
          state.error = null;
          state.currentUser = action.payload.user;
          state.token = action.payload.jwtToken;
          state.loading = false;
        })
        .addCase(signUp.rejected, (state, action) => {
          if(action.payload)
            state.error = action.payload;
          state.loading = false;
        });
    },
  });
  
  export const { signOut } = authSlice.actions;
  
  export default authSlice.reducer;
  