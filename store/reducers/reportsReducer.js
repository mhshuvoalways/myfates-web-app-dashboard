import * as Types from "../constants/reportsTypes";
import * as ClearDataTypes from "../constants/clearDataType";

const init = {
  reports: null,
  error: null,
};

const reportsReudcer = (state = init, action) => {
  switch (action.type) {
    case Types.GET_REPORTS: {
      return {
        ...state,
        reports: action.payload,
        error: null,
      };
    }
    case Types.GET_REPORTS_ERROR: {
      return {
        ...state,
        reports: null,
        error: action.payload,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        reports: null,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default reportsReudcer;
