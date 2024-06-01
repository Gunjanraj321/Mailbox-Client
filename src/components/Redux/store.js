import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import MailReducer from './mailSlice';
// import ErrorReducer from './errorSlice'

const store = configureStore({
    reducer:{
        auth:AuthReducer,
        mail:MailReducer,
        // error:ErrorReducer,
    }
})

export default store;