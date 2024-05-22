import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem("token") ? true : false,
    isToken: localStorage.getItem("token") || null ,
    isEmail: localStorage.getItem("email") || null ,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.isToken = action.payload;
      localStorage.setItem("token",action.payload);
    },
    setEmail:(state,action)=>{
        state.isEmail=action.payload;
        localStorage.setItem("email",action.payload);
    }
    ,
    clearAuthState: (state) => {
      state.isAuth = false;
      state.isToken = null; 
      state.isEmail = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { setAuthenticated, setToken, clearAuthState, setEmail } = AuthSlice.actions;
export default AuthSlice.reducer;
