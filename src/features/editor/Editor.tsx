import React, { useRef, useState } from "react";
import styles from "./Editor.module.css";
import MDEditor from "@uiw/react-md-editor";

export function Editor({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <div className={styles.container}>
      <MDEditor
        className={styles.editor}
        onBlur={(e) => {
          setValue(e.target.textContent as string);
        }}
        preview="edit"
        height={210}
      />
    </div>
  );
}
