import React, { useState } from "react";
import styles from "./Editor.module.css";
import MDEditor from "@uiw/react-md-editor";

export function Editor({
  value,
  setValue,
}: {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  // const [value, setValue] = useState<string | undefined>("");

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
