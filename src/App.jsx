import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PrivateRoute from "./pages/PrivateRoute";
import Time from "./pages/Time";
import DReport from "./pages/DReport";
import Finance from "./pages/Finance";
import Love from "./pages/Love";
import Auth from "./pages/Auth";
import UserInfo from "./pages/UserInfo";
import Tostify from "./components/utils/Toastify";
import Loading from "./components/utils/Loading";
import { isAuthenticate } from "../store/actions/userAction";
import Answer from "./pages/Answere";
import Account from "./pages/Account";

const App = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (userReducer.user?.profile?.language === "en") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("jp");
    }
  }, [i18n, userReducer.user?.profile?.language]);

  useEffect(() => {
    dispatch(isAuthenticate());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Time />
              </PrivateRoute>
            }
          />
          <Route
            path="/d-report"
            element={
              <PrivateRoute>
                <DReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/finance"
            element={
              <PrivateRoute>
                <Finance />
              </PrivateRoute>
            }
          />
          <Route
            path="/love"
            element={
              <PrivateRoute>
                <Love />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/userinfo" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
      <Tostify />
      <Loading />
    </div>
  );
};

export default App;
