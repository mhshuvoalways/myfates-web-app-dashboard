import * as Types from "../constants/reportTypes";
import axios from "../../utils/axios";
import notiAction from "./notiAction";
import enableBtn from "./btnAction";

export const addAllReports = (user) => (dispatch) => {
  dispatch(enableBtn(false));
  axios
    .post("/report/addreport", user)
    .then(() => {
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch(notiAction(err.response?.data.message));
      dispatch(enableBtn(true));
    });
  axios
    .post("/love/addlove", user)
    .then(() => {
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch(enableBtn(true));
      dispatch(notiAction(err.response?.data.message));
    });
  axios
    .post("/finance/addfinance", user)
    .then(() => {
      dispatch(enableBtn(true));
    })
    .catch((err) => {
      dispatch(enableBtn(true));
      dispatch(notiAction(err.response?.data.message));
    });
};

export const getdReport = () => (dispatch) => {
  axios
    .get("/report/getreports")
    .then((response) => {
      dispatch({
        type: Types.GET_REPORT,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_REPORT_ERROR,
        payload: err.response?.data,
      });
    });
};

export const getLoves = () => (dispatch) => {
  axios
    .get("/love/getloves")
    .then((response) => {
      dispatch({
        type: Types.GET_LOVE,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_LOVE_ERROR,
        payload: err.response?.data,
      });
    });
};

export const getFinance = () => (dispatch) => {
  axios
    .get("/finance/getfinances")
    .then((response) => {
      dispatch({
        type: Types.GET_FINANCE,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: Types.GET_FINANCE_ERROR,
        payload: err.response?.data,
      });
    });
};
