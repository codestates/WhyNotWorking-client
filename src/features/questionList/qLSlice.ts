import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import axios from "axios";

export interface PostInfo {
  id: number | null;
  userId: number | null;
  title: string | null;
  body: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  answers: object | null;
  tags: object | null;
  user: object | null;
}

interface QuestionsState {
  posts: PostInfo[];
  count: number;
}

const initialState: QuestionsState = {
  posts: [],
  count: 0,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostInfo[]>) => {
      state.posts = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setPosts, setCount } = questionsSlice.actions;

export const getPostsAsync = (page: number): AppThunk => (dispatch) => {
  axios({
    method: "get",
    url: `http://localhost:4000/posts?page=${page}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    dispatch(setPosts(res.data.data));
  });
};

export const getCountAsync = (): AppThunk => (dispatch) => {
  axios({
    method: "get",
    url: "http://localhost:4000/posts/count",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    dispatch(setCount(res.data.data[0].count));
  });
};

export const selectPosts = (state: RootState) => state.questions.posts;
export const selectCount = (state: RootState) => state.questions.count;
export default questionsSlice.reducer;
