import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Setting.module.css";
import { MenuProps } from "../activity/Activity";
import { Editor } from "../editor/Editor";
import axios from "axios";

export function Setting({ setCurPage, userInfo }: MenuProps) {
  const [nickname, setNickname] = useState<string | null>("");
  const [location, setLocation] = useState<string | null>("");
  const [image, setImage] = useState<string | undefined>(
    "https://i.imgur.com/pG0fYRq.png"
  );
  const [aboutMe, setAboutMe] = useState<string | undefined>("");

  const saveProfile = () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    if (nickname) {
      formData.append("nickname", nickname);
    }
    if (location) {
      formData.append("location", location);
    }
    if (aboutMe) {
      formData.append("aboutMe", aboutMe);
    }

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_SERVER_HOST}/users/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).catch((error) => {
      console.log(error);
    });
  };
  const fileInput = React.createRef<any>();

  const imageChangeHandler = () => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage(`${reader.result}`);
    };
    let url = reader.readAsDataURL(fileInput.current.files[0]);
    console.log(image);
  };

  useEffect(() => {
    setCurPage("setting");
    if (userInfo) {
      const { nickname, location, aboutMe, image } = userInfo;
      setNickname(nickname);
      setLocation(location);
      setAboutMe(aboutMe);
      setImage(image);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Edit your profile</div>
      <div className={styles.infoBox}>
        <div className={styles.imgSetting}>
          <div className={styles.midHead}>Public information</div>
          <div className={styles.imgBox}>
            <img className={styles.img} src={image} alt="profile picture" />
            <label htmlFor="fileInput" className={styles.profileBtn}>
              Change picture
            </label>
          </div>

          <input
            type="file"
            onChange={imageChangeHandler}
            ref={fileInput}
            className={styles.fileInput}
            id="fileInput"
          ></input>
        </div>
        <div className={styles.infoSetting}>
          <div className={styles.lastHead}>Display name</div>
          <input
            type="text"
            className={styles.input}
            value={nickname !== null ? nickname : ""}
          ></input>
          <div className={styles.lastHead}>Location</div>
          <input
            type="text"
            className={styles.input}
            placeholder="위치 입력"
            value={location !== null ? location : ""}
          ></input>
        </div>
      </div>
      <div className={styles.aboutMeBox}>
        <div className={styles.lastHead}>About me</div>
        <Editor setValue={setAboutMe} value={aboutMe} />
      </div>
      <div className={styles.btnBox}>
        <div className={styles.saveBtn} onClick={saveProfile}>
          Save profile
        </div>
      </div>
    </div>
  );
}
