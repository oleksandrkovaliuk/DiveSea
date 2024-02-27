import React, { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import p from "./profilePage.module.scss";
import { ProfileUser } from "../../icons/profileUser";
import { UploadImg } from "../../icons/uploadImg";
import { emailValidation } from "../../service/emailValidation";
import { InputValidationTrue } from "../../icons/inputvalidationtrue";
import CryptoJS from "crypto-js";
import { changeUserValue } from "../../service/autorization.api";
import { SuccesfullyChanged } from "../../components/succesfullNotification";
import { UserContext } from "../../context/UserContext";
import { UploadImgMenu } from "../../components/popUpMenuForUploadingImg";

export const UserProfile = () => {
  const { userInfo, setDataForUser } = useContext(UserContext);
  const [newUserName, setUpNewUserName] = useState("");
  const [newUserEmail, setUpNewUserEmail] = useState("");
  // const [userUpdatedImg, checkIfUserUpdatedImg] = useState(false);
  const [checkEmail, checkIfNewEmailNotValid] = useState(false);
  const [checkUserName, checkIfUserNaveValid] = useState(false);
  const [succesfullyChanged, checkIfSuccesfullyChanged] = useState(false);
  const [uploadImg, openUploadImgMenu] = useState(false);
  const setUpNewUserValue = (event) => {
    const newValue = event.target.value;
    if (newValue !== userInfo.username && newValue.length > 4) {
      setUpNewUserName(newValue);
      checkIfUserNaveValid(true);
      checkIfSuccesfullyChanged(false);
    } else {
      checkIfUserNaveValid(false);
    }
  };
  const setUpNewEmail = (event) => {
    const newValue = event.target.value;

    if (emailValidation(newValue)) {
      setUpNewUserEmail(newValue);
      checkIfNewEmailNotValid(true);
      checkIfSuccesfullyChanged(false);
    } else {
      checkIfNewEmailNotValid(false);
    }
  };
  const sendRequestForUpdatingUserInfo = async (event) => {
    event.preventDefault();
    console.log(userInfo.url, "url");
    if (checkEmail || checkUserName || userInfo?.url) {
      try {
        const res = await changeUserValue({
          email: checkEmail ? newUserEmail : userInfo.email,
          userName: checkUserName ? newUserName : userInfo.username,
          url: userInfo?.url ? userInfo.url : null,
          id: userInfo.id,
        });
        setDataForUser(res.user);
        console.log(res.user.url, "user");
        const cypherEmail = CryptoJS.AES.encrypt(
          res.user.email,
          process.env.REACT_APP_PASSWORD_FOR_DECRYPT
        ).toString();
        setTimeout(() => {
          document.cookie = `user=${cypherEmail};max-age=${7 * 24 * 60 * 60}`;
        }, 10);
        checkIfSuccesfullyChanged(true);
      } catch (error) {
        console.error(error, "error with updating user info");
      }
    }
  };
  const handleOpeningUpladImgMenu = () => {
    openUploadImgMenu(!uploadImg);
  };
  const closeUploadImgMenu = () => {
    openUploadImgMenu(false);
  };
  // useEffect(() => {
  //   setUpNewUserName(userInfo ? userInfo.username : "");
  //   setUpNewUserEmail(userInfo ? userInfo.email : "");
  //   if(userInfo?.url){
  //     checkIfUserUpdatedImg(true)
  //   }
  // }, [userInfo]);
  return (
    <>
      {uploadImg && (
        <UploadImgMenu closeUploadMenu={() => closeUploadImgMenu()} />
      )}
      <SuccesfullyChanged showMessage={succesfullyChanged}>
        <span>You succesfully changed your information</span>
      </SuccesfullyChanged>
      <div className={p.profilePageContainer}>
        <div className={p.profiletPagetopSection}>
          <div className={p.profileImg}>
            {userInfo?.url ? (
              <img src={userInfo.url} alt="userProfileImg" />
            ) : (
              <ProfileUser />
            )}
            <button
              onClick={() => handleOpeningUpladImgMenu()}
              className={p.uploadImg}
            >
              <UploadImg />
            </button>
          </div>
        </div>
        <form className={p.changeInfoAboutUser}>
          <div className={p.fieldWithInfo}>
            <span>Username</span>
            <div className={p.inputWithInfo}>
              <input
                placeholder=" "
                type="text"
                id="username"
                name="username"
                className={p.userInfo}
                onChange={(event) => setUpNewUserValue(event)}
              ></input>
              <label htmlFor="username" className={p.label}>
                {newUserName ? newUserName : userInfo?.username}
              </label>
              {checkUserName && <InputValidationTrue />}
            </div>
          </div>
          <div className={p.fieldWithInfo}>
            <span>Email</span>
            <div className={p.inputWithInfo}>
              <input
                placeholder=" "
                type="email"
                id="email"
                name="email"
                className={p.userInfo}
                onChange={(event) => setUpNewEmail(event)}
              ></input>
              <label htmlFor="email" className={p.label}>
              {newUserEmail ? newUserEmail : userInfo?.email}
              </label>
              {checkEmail && <InputValidationTrue />}
            </div>
          </div>
          <button
            style={
              checkEmail || checkUserName || userInfo?.url
                ? { opacity: "1", pointerEvents: "unset" }
                : { opacity: "0.4", pointerEvents: "none" }
            }
            className={p.submitChanges}
            onClick={(event) => sendRequestForUpdatingUserInfo(event)}
          >
            Submit Changes
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
