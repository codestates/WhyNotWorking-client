import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Editor.module.css";
import MDEditor from "@uiw/react-md-editor";

interface EditorProps {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function Editor({ setValue }: EditorProps) {
  return (
    <div className={styles.container}>
      <MDEditor
        className={styles.editor}
        onChange={(e) => {
          setValue(e);
        }}
        preview="edit"
        height={210}
      />
    </div>
  );
}
