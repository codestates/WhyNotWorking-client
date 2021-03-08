import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBody, selectBody } from "./editorSlice";
import styles from "./Editor.module.css";
import MDEditor from "@uiw/react-md-editor";

export function Editor() {
  const body = useSelector(selectBody);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <MDEditor
        className={styles.editor}
        onChange={(e) => {
          console.log(e);
          dispatch(setBody(e));
          console.log(body);
        }}
        preview="edit"
        height={210}
      />
    </div>
  );
}
