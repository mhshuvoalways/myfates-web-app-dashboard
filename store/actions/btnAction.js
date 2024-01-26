import * as Types from "../constants/btnType";

const btnAction = (value) => (dispatch) => {
  dispatch({
    type: Types.ENABLE_BTN,
    payload: value,
  });
};

export default btnAction;
