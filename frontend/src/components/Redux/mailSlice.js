import { createSlice } from "@reduxjs/toolkit";

const MailSlice = createSlice({
  name: "mail",
  initialState: {
    sentMails:[],
    inboxMails:[],
  },
  reducers: {
    setSentMails: (state, action) => {
      state.sentMails = action.payload;
    },
    setInboxMails: (state, action) => {
      state.inboxMails = action.payload;
    }
  },
});

export const { setInboxMails, setSentMails } = MailSlice.actions;
export default MailSlice.reducer;
