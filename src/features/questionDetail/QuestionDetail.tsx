import React, { useState } from "react";
import { Editor } from "../editor/Editor";
import styles from "./QuestionDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MDEditor from "@uiw/react-md-editor";
import avatar from "../../assets/images/avatar.jpg";

export function QuestionDetail() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.titleBox}>
            AWS CodePipline - How to implement production deployment for certain
            clients using the pipeline hosted on same EC2
          </div>
          <div className={styles.askBox}>
            <button className={styles.askButton}>Ask Question</button>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <ul>
            <li>
              <span>Asked</span>
              <span>today</span>
            </li>
            <li>
              <span>Active</span>
              <span>today</span>
            </li>
            <li>
              <span>Viewed</span>
              <span>2 times</span>
            </li>
          </ul>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainLeft}>
          <div className={styles.postBox}>
            <div className={styles.recommendBox}>
              <div className={styles.upDown}>
                <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>
              </div>
              <div className={styles.upDownNumber}>0</div>
              <div className={styles.upDown}>
                <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
              </div>
            </div>
            <div className={styles.contentBox}>
              <div className={styles.content}>
                <MDEditor.Markdown source={"**hahaha**"} />
              </div>
              <div className={styles.tagsBox}>
                <ul className={styles.tags}>
                  <li>amazon-ec2</li>
                  <li>aws-codepipeline</li>
                </ul>
              </div>
              <div className={styles.contentUtilsBox}>
                <ul className={styles.editBox}>
                  <li>Share</li>
                  <li>Edit</li>
                  <li>Follow</li>
                </ul>
                <div className={styles.userBox}>
                  <img src={avatar} alt="userImage" className={styles.avatar} />
                  <div className={styles.username}>Munawiki</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.editorBox}>
            <Editor />
          </div>
        </div>
        <div className={styles.mainRight}></div>
      </main>
    </div>
  );
}
