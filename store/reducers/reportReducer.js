import * as Types from "../constants/reportTypes";
import * as ClearDataTypes from "../constants/clearDataType";

const init = {
  dReports: null,
  loves: null,
  finances: null,
  error: null,
};

const reportReducer = (state = init, action) => {
  switch (action.type) {
    case Types.GET_REPORT: {
      return {
        ...state,
        dReports: action.payload,
      };
    }
    case Types.GET_REPORT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case Types.GET_LOVE: {
      return {
        ...state,
        loves: action.payload,
      };
    }
    case Types.GET_LOVE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case Types.GET_FINANCE: {
      return {
        ...state,
        finances: action.payload,
      };
    }
    case Types.GET_FINANCE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        dReports: null,
        loves: null,
        finances: null,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default reportReducer;
