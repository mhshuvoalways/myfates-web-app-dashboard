import * as Types from "../constants/userTypes";
import * as ClearDataTypes from "../constants/clearDataType";
import moment from "moment";

const init = {
  isAuthenticate: true,
  isProfile: true,
  isExpired: true,
  user: {},
  error: null,
};

const userReudcer = (state = init, action) => {
  switch (action.type) {
    case Types.LOGIN_USER_ERROR: {
      return {
        ...state,
        isAuthenticate: false,
        user: {},
        error: action.payload.error,
      };
    }

    case Types.USER_UPDATE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case Types.ISAUTHENTICATE: {
      return {
        ...state,
        isAuthenticate: action.payload.isAuthenticate,
      };
    }

    case Types.GET_MYACCOUT: {
      return {
        ...state,
        user: action.payload,
        isProfile:
          action.payload.profile?.firstName &&
          action.payload.profile?.lastName &&
          action.payload.profile?.gender &&
          action.payload.profile?.birthDate,
        isExpired:
          action.payload.subscriptionPlan?.expireDate >
          moment(new Date()).format("YYYY-MM-DD"),
      };
    }
    case Types.GET_MYACCOUT_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ClearDataTypes.CLEAR_DATA: {
      return {
        isAuthenticate: false,
        user: {},
        error: null,
      };
    }
    default:
      return state;
  }
};

export default userReudcer;
