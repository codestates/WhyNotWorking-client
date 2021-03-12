import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navReducer from "../features/nav/navSlice";
import pageReducer from "../features/pagination/paginationSlice";
import questionsReducer from "../features/questionList/qLSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import signInReducer from "../features/signIn/signInSlice";
import askReducer from "../features/askPage/askSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    nav: navReducer,
    page: pageReducer,
    sidebar: sidebarReducer,
    signIn: signInReducer,
    questions: questionsReducer,
    ask: askReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
