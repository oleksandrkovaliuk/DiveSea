import React, { useContext, useEffect, useState } from "react";
import Context from "../../context";
import { Footer } from "../../components/footer";
import p from "./profilePage.module.scss";
import { ProfileUser } from "../../icons/profileUser";
import { UploadImg } from "../../icons/uploadImg";
import { emailValidation } from "../../service/emailValidation";
import { InputValidationTrue } from "../../icons/inputvalidationtrue";
import { getCookie } from "../../service/getCookie";
export const UserProfile = () => {
  const getDataForUser = useContext(Context);
  const [newUserName, setUpNewUserName] = useState("");
  const [newUserEmail, setUpNewUserEmail] = useState("");
  const [checkEmail, checkIfNewEmailNotValid] = useState(false);
  const [checkUserName, checkIfUserNaveValid] = useState(false);
  const [succesfullyChanged, checkIfSuccesfullyChanged] = useState(false);
  const setUpNewUserValue = (event) => {
    const newValue = event.target.value;
    if (newValue !== getDataForUser.userInfo.username && newValue.length > 4) {
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
  const sendRequestForUpdatingUserInfo = (event) => {
    event.preventDefault();
    if (checkEmail || checkUserName) {
      fetch("http://localhost:3003/api/ChangeUserValue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: checkEmail ? newUserEmail : getDataForUser.userInfo.email,
          username: checkUserName
            ? newUserName
            : getDataForUser.userInfo.username,
          id: getDataForUser.userInfo.id,
        }),
      })
        .then((res) => {
          console.log(res, "respons");
          return res.json();
        })
        .then((data) => {
          if (data) {
            getDataForUser.setDataForUser(data.user);
            setTimeout(() => {
              document.cookie = `user=${JSON.stringify(data.user)};max-age=${
                7 * 24 * 60 * 60
              }`;
            }, 10);
            checkIfSuccesfullyChanged(true);
            console.log(succesfullyChanged);
          }
        })
        .catch((err) => {
          console.error(err, "error with updating user info");
        });
    }
  };
  return (
    <>
      {succesfullyChanged && (
        <div className={p.alertIfSuccesfullyChanged}>
          <span>You succesfully changed your information</span>
        </div>
      )}
      <div className={p.profilePageContainer}>
        <div className={p.profiletPagetopSection}>
          <div className={p.profileImg}>
            <ProfileUser />
            <button className={p.uploadImg}>
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
                {getDataForUser.userInfo.username}
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
                {getDataForUser.userInfo.email}
              </label>
              {checkEmail && <InputValidationTrue />}
            </div>
          </div>
          <button
            style={
              checkEmail || checkUserName
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
