import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RadioBtn from "./RadioBtn";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";
import { userUpdate } from "../../../store/actions/userAction";

const UserInfo = () => {
  const [dontKnow, setDontKnow] = useState(false);
  const [radioBtn, setRadioBtn] = useState("am");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    birthDateMM: "",
    birthDateDD: "",
    birthDateYYYY: "",
    birthTimeHH: "",
    birthTimeMM: "",
  });
  const [preLang, setPreLang] = useState("");

  const { i18n, t } = useTranslation();
  const myform = t("form", { returnObjects: true });
  const dispatch = useDispatch();
  const router = useNavigate();

  const userReducer = useSelector((store) => store.userReducer);

  const birthHandler = (event) => {
    if (event.target.checked) {
      setDontKnow(true);
    } else {
      setDontKnow(false);
    }
  };

  const onChangeHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const getLanguage =
      typeof window !== "undefined" && localStorage.getItem("language");
    setPreLang(getLanguage);
    i18n.changeLanguage(getLanguage);
  }, [i18n]);

  const changedLanguage = (value) => {
    setPreLang(value);
    i18n.changeLanguage(value);
    typeof window !== "undefined" && localStorage.setItem("language", value);
  };

  const onSubmitHandler = (e) => {
    if (userData) {
      e.preventDefault();
      const hrCalculate =
        radioBtn === "am"
          ? userData.birthTimeHH
          : Number(userData.birthTimeHH) + 12;
      const formatuserData = {
        language: preLang,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        birthDate: `${userData.birthDateYYYY}-${userData.birthDateMM}-${userData.birthDateDD}`,
        birthTime: userData.birthTimeHH
          ? userData.birthTimeMM && `${hrCalculate}:${userData.birthTimeMM}:00`
          : "",
      };
      dispatch(userUpdate(formatuserData, router));
    }
  };

  useEffect(() => {
    if (!userReducer.isAuthenticate) {
      router("/login");
    }
    if (userReducer.isProfile) {
      router("/answer");
    }
  }, [router, userReducer.isAuthenticate, userReducer.isProfile]);

  return (
    <div className="p-10 min-h-screen flex justify-center items-center bg-[#f1ede8]">
      <div className="max-w-3xl bg-white mx-auto flex flex-wrap md:flex-nowrap justify-between p-10 md:p-20 gap-12 items-center flex-col-reverse md:flex-row">
        <div className="space-y-10 w-8/12 md:w-5/12 mx-auto">
          <img src="/images/auth.png" alt="" />
          <p className="text-center">
            <Link
              to={`${import.meta.env.VITE_CLIENT_PANEL_URL}/signup`}
              target="blank"
              className="underline"
            >
              Create an account
            </Link>
          </p>
        </div>
        <form className="w-full md:w-7/12" onSubmit={onSubmitHandler}>
          <div>
            <div className="flex items-center gap-2">
              <p>Your preferred language:</p>
            </div>
            <select
              className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
              onChange={(e) => changedLanguage(e.target.value)}
              value={preLang}
            >
              <option value={"en"}>English</option>
              <option value={"jp"}>Japanese</option>
            </select>
          </div>
          <div className="mt-8">
            <p>{myform.fName}:</p>
            <input
              type="text"
              className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
              required
              onChange={onChangeHandler}
              name="firstName"
            />
          </div>
          <div className="mt-8">
            <p>{myform.lName}:</p>
            <input
              type="text"
              className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
              required
              onChange={onChangeHandler}
              name="lastName"
            />
          </div>
          <div className="mt-8">
            <p>{myform.genderText}:</p>
            <select
              className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
              required
              onChange={onChangeHandler}
              name="gender"
            >
              <option value={"Male"}>{myform.gender[0]}</option>
              <option value="Female">{myform.gender[1]}</option>
            </select>
          </div>
          <div className="mt-8">
            <p>{myform.bt}:</p>
            <div className="flex gap-5 items-center mt-5">
              <div>
                <p>{myform.ymd[2]}</p>
                <div className="flex gap-5 items-center">
                  <input
                    type="text"
                    className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
                    required
                    placeholder="DD"
                    maxLength={2}
                    onChange={onChangeHandler}
                    name="birthDateDD"
                  />
                  <p className="font-semibold">/</p>
                </div>
              </div>
              <div>
                <p>{myform.ymd[1]}</p>
                <div className="flex gap-5 items-center">
                  <input
                    type="text"
                    className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
                    required
                    placeholder="MM"
                    maxLength={2}
                    onChange={onChangeHandler}
                    name="birthDateMM"
                  />
                  <p className="font-semibold">/</p>
                </div>
              </div>
              <div>
                <p>{myform.ymd[0]}</p>
                <input
                  type="text"
                  className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
                  required
                  placeholder="Year"
                  onChange={onChangeHandler}
                  name="birthDateYYYY"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {dontKnow && (
              <motion.div
                className={`flex gap-2 items-center`}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 25 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: "0.2" }}
              >
                <input
                  type="text"
                  className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
                  required
                  placeholder="hh"
                  maxLength={2}
                  max={24}
                  onChange={onChangeHandler}
                  name="birthTimeHH"
                />
                <p className="font-semibold">:</p>
                <input
                  type="text"
                  className="border-b-2 border-gray-400 outline-0 pr-2 w-full"
                  required
                  placeholder="mm"
                  maxLength={2}
                  onChange={onChangeHandler}
                  name="birthTimeMM"
                />
                <RadioBtn
                  myName="am"
                  selectBtn={radioBtn}
                  radioHandler={setRadioBtn}
                />
                <RadioBtn
                  myName="pm"
                  selectBtn={radioBtn}
                  radioHandler={setRadioBtn}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={`transition-all duration-500 ${
              dontKnow ? "mt-16" : "mt-8"
            }`}
          >
            <label className="flex gap-2">
              <input
                type="checkbox"
                name="check"
                checked={dontKnow}
                onChange={birthHandler}
                className="cursor-pointer"
              />
              <p className="cursor-pointer">{myform.dk}</p>
            </label>
          </div>
          <Button value={myform.btn} className={"mt-8 w-full uppercase"} />
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
