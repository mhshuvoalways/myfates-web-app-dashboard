import * as Types from "../constants/alertTypes";

const notiAction = (msg) => (dispatch) => {
  dispatch({
    type: Types.ALERT_TYPE,
    payload: msg || "",
  });
  setTimeout(() => {
    dispatch({
      type: Types.ALERT_TYPE,
      payload: "",
    });
  });
};
export default notiAction;
