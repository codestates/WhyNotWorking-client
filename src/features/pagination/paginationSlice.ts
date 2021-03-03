import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface PageState {
  curPage: number;
  pageList: Array<number>;
}

const initialState: PageState = {
  curPage: 1,
  pageList: [1, 2, 3, 4, 5],
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    next: (state) => {
      state.curPage += 1;
    },
    prev: (state) => {
      state.curPage -= 1;
    },
    moveToPage: (state, action: PayloadAction<number>) => {
      state.curPage = action.payload;
    },
    setPageList: (state, action: PayloadAction<number>) => {
      const lastPage = action.payload;
      const curPage = state.curPage;

      if (lastPage < 7) {
        let list: Array<number> = [];
        for (let i = 1; i <= lastPage; i++) {
          list.push(i);
        }
        state.pageList = list;
      } else {
        if (curPage - 4 >= 1 && curPage + 4 <= lastPage) {
          state.pageList = [
            1,
            0,
            curPage - 2,
            curPage - 1,
            curPage,
            curPage + 1,
            curPage + 2,
            -1,
            lastPage,
          ];
          return;
        }
        if (curPage - 4 >= 1 || curPage + 4 > lastPage) {
          state.pageList = [
            1,
            0,
            lastPage - 4,
            lastPage - 3,
            lastPage - 2,
            lastPage - 1,
            lastPage,
          ];
          return;
        }
        if (curPage < 4 || curPage + 4 <= lastPage) {
          state.pageList = [1, 2, 3, 4, 5, 0, lastPage];
          return;
        }
      }
    },
  },
});

export const { next, prev, moveToPage, setPageList } = pageSlice.actions;

export const selectPage = (state: RootState) => state.page.curPage;
export const selectPageList = (state: RootState) => state.page.pageList;

export default pageSlice.reducer;
