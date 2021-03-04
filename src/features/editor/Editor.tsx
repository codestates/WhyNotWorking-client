import React, { useState } from "react";
import styles from "./Editor.module.css";
import MDEditor from "@uiw/react-md-editor";

export function Editor() {
  const [value, setValue] = useState<string | undefined>("");

  return (
    <div className={styles.container}>
      <MDEditor
        className={styles.editor}
        value={value}
        onChange={setValue}
        preview="edit"
        height={210}
      />
    </div>
  );
}
