import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import MailReducer from './mailSlice';

const store = configureStore({
    reducer:{
        auth:AuthReducer,
        mail:MailReducer,
    }
})

export default store;