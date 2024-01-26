import * as Types from "../constants/notiTypes";
import * as ClearDataTypes from "../constants/clearDataType";

const notiReducer = (state = "", action) => {
  switch (action.type) {
    case Types.ALERT_TYPE: {
      return action.payload;
    }
    case ClearDataTypes.CLEAR_DATA: {
      return "";
    }
    default:
      return state;
  }
};

export default notiReducer;
