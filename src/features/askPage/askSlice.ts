import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { PostInterface } from "../post/Post";

const initialState: { currentPost: PostInterface | null } = {
  currentPost: null,
};

export const askSlice = createSlice({
  name: "ask",
  initialState,
  reducers: {
    currentPost: (state, action: PayloadAction<PostInterface>) => {
      state.currentPost = action.payload;
    },
  },
});

export const { currentPost } = askSlice.actions;

export const selectEditPost = (state: RootState) => state.ask.currentPost;

export default askSlice.reducer;
