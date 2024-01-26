import { jwtDecode } from "jwt-decode";
import * as Types from "../constants/userTypes";
import { CLEAR_DATA } from "../constants/clearDataType";
import setAuthToken from "../../utils/setAuthToken";
import axios from "../../utils/axios";
import notiAction from "./notiAction";
import enableBtn from "./btnAction";

export const userLogin = (user, navigate) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/user/loginclientdashboard", user)
    .then((response) => {
      dispatch(enableBtn(true));
      setAuthToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      dispatch(isAuthenticate());
      if (response.data.hasReports) {
        navigate("/");
      } else {
        navigate("/userinfo");
      }
    })
    .catch((err) => {
      dispatch({
        type: Types.LOGIN_USER_ERROR,
        payload: {
          error: err.response?.data,
        },
      });
      dispatch(enableBtn(true));
      dispatch(notiAction(err.response?.data.message));
    });
};

export const userLoginwithGoogle = (access_token, navigate) => (dispatch) => {
  dispatch(enableBtn(false));
  const userInfoEndpoint = "https://www.googleapis.com/oauth2/v2/userinfo";
  fetch(userInfoEndpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch(userLogin(response, navigate));
    })
    .catch(() => {
      dispatch(notiAction("Login failed! Try again"));
    });
};

export const userUpdate = (user, navigate) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .put("/user/updateuser", user)
    .then(() => {
      dispatch(isAuthenticate());
      dispatch(enableBtn(true));
      navigate("/answer");
    })
    .catch((err) => {
      dispatch({
        type: Types.USER_UPDATE_ERROR,
        payload: err.response?.data,
      });
      dispatch(enableBtn(true));
      dispatch(notiAction(err.response?.data.message));
    });
};

export const userLoginWithMyfates = (token, navigate) => (dispatch) => {
  setAuthToken(token);
  localStorage.setItem("token", token);
  dispatch(isAuthenticate());
  navigate("/");
};

export const isAuthenticate = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    var decoded = jwtDecode(token);
    var dateNow = new Date();
    if (decoded.exp * 1000 < dateNow.getTime()) {
      dispatch({
        type: Types.ISAUTHENTICATE,
        payload: {
          isAuthenticate: false,
        },
      });
      localStorage.removeItem("token");
      setAuthToken("");
    } else {
      dispatch({
        type: Types.ISAUTHENTICATE,
        payload: {
          isAuthenticate: true,
        },
      });
      dispatch(getMyAccount());
    }
  } else {
    dispatch({
      type: Types.ISAUTHENTICATE,
      payload: {
        isAuthenticate: false,
      },
    });
    setAuthToken("");
  }
};

export const getMyAccount = () => (dispatch) => {
  axios
    .get("/user/getmyaccount")
    .then((res) => {
      dispatch({
        type: Types.GET_MYACCOUT,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_MYACCOUT,
        payload: err.response?.data,
      });
    });
};

export const logout = (navigate) => (dispatch) => {
  dispatch({
    type: Types.LOGOUT_USER,
    payload: {
      isAuthenticate: false,
    },
  });
  dispatch({
    type: CLEAR_DATA,
  });
  localStorage.removeItem("token");
  setAuthToken("");
  navigate("/userinfo");
};
