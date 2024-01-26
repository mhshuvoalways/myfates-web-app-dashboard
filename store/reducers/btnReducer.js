import * as Types from "../constants/btnType";
import * as ClearDataTypes from "../constants/clearDataType";

const btnReducer = (state = true, action) => {
  switch (action.type) {
    case Types.ENABLE_BTN: {
      return action.payload;
    }
    case ClearDataTypes.CLEAR_DATA: {
      return true;
    }
    default:
      return state;
  }
};

export default btnReducer;
