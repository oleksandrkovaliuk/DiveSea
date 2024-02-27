import React, { useContext, useEffect, useState } from "react";
import i from "./uploadImg.module.scss";
import { Close } from "../../icons/closeBtn";
import { UserContext } from "../../context/UserContext";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ProfileUser } from "../../icons/profileUser";
export const UploadImgMenu = ({ closeUploadMenu }) => {
  const { userInfo, setDataForUser } = useContext(UserContext);
  const [uploadedImg, setUploadedImg] = useState();
  const imageRefPath = ref(storage, `user${userInfo.id}/`);
  const getImgFromInput = async (event) => {
    const img = event.target.files[0];
    const imageRef = ref(storage, `user${userInfo.id}/${img.name}`);
    try {
      await listAll(imageRefPath)
        .then((res) => {
          res.items.map((item) => deleteObject(item));
        })
        .then(() => {
          uploadBytes(imageRef, img).then(() => {
            listAll(imageRefPath).then((res) => {
              getDownloadURL(res.items[0]).then((url) => {
                setUploadedImg(url);
                setDataForUser({ ...userInfo, url: url });
                console.log(userInfo, "new info");
              });
            });
          });
        });
    } catch (error) {
      throw Error(error, "failed with uploading img");
    }
  };
  const submitChangedImg = (event) => {
    if (uploadedImg) {
      closeUploadMenu(event);
    }
  };
  useEffect(() => {
    const body = document.body;
    body.classList.add("disable-scroll-page");

    return () => {
      body.classList.remove("disable-scroll-page");
    };
  }, []);
  return (
    <>
      <div onClick={closeUploadMenu} className={i.bg}></div>
      <div className={i.uploadImgContainer}>
        <div className={i.uploadImgInputWrap}>
          <button onClick={closeUploadMenu} className={i.close}>
            <Close />
          </button>
          <h1 className={i.main_text}>Upload your img</h1>
          <div
            style={
              userInfo?.url
                ? { backgroundImage: `url(${userInfo.url})` }
                : { backgroundImage: `url(${(<ProfileUser />)})` }
            }
            className={i.prewie}
          ></div>
          <div className={i.uploadBtn}>
            <label htmlFor="uploadingFile" className={i.inputForUploadingImgs}>
              <input
                type="file"
                id="uploadingFile"
                name="uploadingFile"
                onChange={(event) => getImgFromInput(event)}
              ></input>
              Upload your img
            </label>
          </div>
          <button
            onClick={(event) => submitChangedImg(event)}
            style={
              uploadedImg
                ? { opacity: "1", pointerEvents: "unset" }
                : { opacity: "0.4", pointerEvents: "none" }
            }
            className={i.submitBtn}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
