import * as Types from "../constants/reportsTypes";
import axios from "../../utils/axios";
import notiAction from "./notiAction";
import enableBtn from "./btnAction";
import { isAuthenticate } from "./userAction";

export const addReport = (userValue, router) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/reports/addreports", userValue)
    .then(() => {
      dispatch(enableBtn(true));
      dispatch(isAuthenticate());
      router("/");
    })
    .catch((err) => {
      dispatch(enableBtn(true));
      dispatch(notiAction(err.response?.data.message));
    });
};

export const getreports = () => (dispatch) => {
  axios
    .get("/reports/getreports")
    .then((res) => {
      dispatch({
        type: Types.GET_REPORTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_REPORTS_ERROR,
        payload: err.response?.data,
      });
    });
};
