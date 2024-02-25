import React, { useContext, useState } from "react";
import { Footer } from "../../components/footer";
import p from "./profilePage.module.scss";
import { ProfileUser } from "../../icons/profileUser";
import { UploadImg } from "../../icons/uploadImg";
import { emailValidation } from "../../service/emailValidation";
import { InputValidationTrue } from "../../icons/inputvalidationtrue";
import CryptoJS from "crypto-js";
import { workWithAutorization } from "../../service/autorization.api";
import { SuccesfullyChanged } from "../../components/succesfullNotification";
import { UserContext } from "../../context/UserContext";

export const UserProfile = () => {
  const { userInfo, setDataForUser } = useContext(UserContext);
  const [newUserName, setUpNewUserName] = useState("");
  const [newUserEmail, setUpNewUserEmail] = useState("");
  const [checkEmail, checkIfNewEmailNotValid] = useState(false);
  const [checkUserName, checkIfUserNaveValid] = useState(false);
  const [succesfullyChanged, checkIfSuccesfullyChanged] = useState(false);
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
    if (checkEmail || checkUserName) {
      try {
        const res = await workWithAutorization({
          reqType: "/changeUserValue",
          emailValue: checkEmail ? newUserEmail : userInfo.email,
          userName: checkUserName ? newUserName : userInfo.username,
          id: userInfo.id,
        });
        setDataForUser(res.user);
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
  return (
    <>
      <SuccesfullyChanged showMessage={succesfullyChanged}>
        <span>You succesfully changed your information</span>
      </SuccesfullyChanged>
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
                {userInfo.username}
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
                {userInfo.email}
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
