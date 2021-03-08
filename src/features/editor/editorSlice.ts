import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface EditorState {
  body: string | undefined;
}

const initialState: EditorState = {
  body: "",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setBody: (state, action: PayloadAction<string | undefined>) => {
      state.body = action.payload;
    },
  },
});

export const { setBody } = editorSlice.actions;

export const selectBody = (state: RootState) => state.editor.body;

export default editorSlice.reducer;
