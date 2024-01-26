import moment from "moment";
import { useEffect } from "react";
import { CiCalendar, CiDollar, CiHeart, CiUser, CiHome } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticate, logout } from "../../../store/actions/userAction";

const SidebarHeader = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userReducer = useSelector((store) => store.userReducer);

  useEffect(() => {
    dispatch(isAuthenticate(navigate));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (
      userReducer.user?.subscriptionPlan?.expireDate <
      moment(new Date()).format("YYYY-MM-DD")
    ) {
      dispatch(logout(navigate));
    }
  }, [dispatch, navigate, userReducer.user?.subscriptionPlan?.expireDate]);

  return (
    <div className="sm:flex">
      <div
        className={`bg-gray-900 text-gray-100 shadow-lg h-auto sm:h-screen flex items-center justify-center fixed bottom-0 left-0 right-0 sm:right-auto sm:bottom-auto z-50 w-full sm:w-[6%]`}
      >
        <ul className="list-none flex sm:block justify-between w-10/12 sm:w-auto px-0 sm:px-4 py-2 sm:space-y-16">
          <li>
            <Link to="/">
              <p>
                <CiHome
                  className={`text-4xl rounded-xl p-1 ${
                    location.pathname === "/" && "bg-gray-600"
                  }`}
                />
              </p>
            </Link>
          </li>
          <li>
            <Link to="/d-report">
              <p>
                <CiCalendar
                  className={`text-4xl rounded-xl p-1 ${
                    location.pathname === "/d-report" && "bg-gray-600"
                  }`}
                />
              </p>
            </Link>
          </li>
          <li>
            <Link to="/finance">
              <p>
                <CiDollar
                  className={`text-4xl rounded-xl p-1 ${
                    location.pathname === "/finance" && "bg-gray-600"
                  }`}
                />
              </p>
            </Link>
          </li>
          <li>
            <Link to="/love">
              <p>
                <CiHeart
                  className={`text-4xl rounded-xl p-1 ${
                    location.pathname === "/love" && "bg-gray-600"
                  }`}
                />
              </p>
            </Link>
          </li>
          <li>
            <Link to="/account">
              <p>
                <CiUser
                  className={`text-4xl rounded-xl p-1 ${
                    location.pathname === "/account" && "bg-gray-600"
                  }`}
                />
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`w-full sm:w-[94%] bg-[#fcfcfc] text-gray-700 ml-auto pb-20`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarHeader;
