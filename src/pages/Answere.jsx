import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImgTemp from "../../public/images/template/kl.png";
import { useTranslation } from "react-i18next";
import { addAllReports } from "../../store/actions/reportAction";
import { addReport } from "../../store/actions/reportsAction";

const Template = () => {
  const [start, setStart] = useState("initial");
  const [stepQuestions, setStepQuestions] = useState(0);
  const [userPersonality, setUserPersonality] = useState("");

  const { t } = useTranslation();
  const questions = t("questions", { returnObjects: true });
  const datacreating = t("datacreating");

  const userReducer = useSelector((store) => store.userReducer);

  const dispatch = useDispatch();
  const router = useNavigate();

  const nextHandler = (person) => {
    setStepQuestions((prev) => {
      if (prev >= questions.length - 1) {
        setStart("loading");
      }
      if (person) {
        setUserPersonality(userPersonality.concat(person).trim());
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    const getUser = userReducer.user?.profile;
    if (getUser) {
      getUser.personality = userPersonality;
      getUser.language = localStorage.getItem("language");
      setTimeout(() => {
        if (userPersonality.length === 4) {
          dispatch(addReport(getUser, router));
          dispatch(addAllReports(getUser));
        }
      }, 12000);
    }
  }, [dispatch, router, userPersonality, userReducer.user?.profile]);

  useEffect(() => {
    if (!(userReducer.isAuthenticate && userReducer.isProfile)) {
      router("/userinfo");
    }
    if (userReducer.isExpired) {
      router("/");
    }
  }, [
    router,
    userReducer.isAuthenticate,
    userReducer.isExpired,
    userReducer.isProfile,
  ]);

  const myItem = questions[stepQuestions];

  return (
    <div className={`h-screen template`}>
      <div className="max-w-[500px] w-full mx-auto text-center">
        {start === "initial" && (
          <>
            <img src={ImgTemp} alt="" className="w-7/12 mx-auto pt-20" />
            <div className="fixed bottom-5 max-w-[500px] px-5 sm:px-0 w-full mx-auto">
              <div
                className="template-btn cursor-pointer"
                onClick={() => setStart("start")}
              >
                <p className="text-white text-2xl">Start your Journey</p>
                <p className="text-gray-300">720,219 people visited MyFates</p>
              </div>
            </div>
          </>
        )}
        {start === "start" && (
          <div className="py-5">
            <p className="text-white text-5xl font-thin">Q.</p>
            <p className="border w-0 mx-auto h-28 my-2"></p>
            <p className="text-white font-thin">
              {stepQuestions + 1}/{questions.length}
            </p>
            <p className="text-white font-semibold mt-5 text-lg px-5 sm:px-0">
              {myItem.question}
            </p>
            <div className="fixed bottom-5 max-w-[500px] w-full px-5 sm:px-0 mx-auto">
              <div>
                <div className="space-y-3">
                  <Fade right key={myItem.firstAns.option}>
                    <button
                      className="bg-white text-[#333333] w-full p-5 rounded-full text-[18px]"
                      onClick={() => nextHandler(myItem.firstAns.personality)}
                    >
                      {myItem.firstAns.option}
                    </button>
                  </Fade>
                  <Fade right key={myItem.secAnd.option} delay={100}>
                    <button
                      className="bg-white text-[#333333] w-full p-5 rounded-full text-[18px]"
                      onClick={() => nextHandler(myItem.secAnd.personality)}
                    >
                      {myItem.secAnd.option}
                    </button>
                  </Fade>
                </div>
                <p className="text-gray-400 mt-5">MyFates</p>
              </div>
            </div>
          </div>
        )}
        {start === "loading" && (
          <div className="flex justify-center items-center h-screen">
            <div>
              <p className="border-[15px] w-40 h-40 border-white"></p>
              <p className="text-white mt-5 capitalize text-xl">
                {datacreating}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
