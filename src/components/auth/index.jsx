import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import notiAction from "../../../store/actions/notiAction";
import {
  isAuthenticate,
  userLogin,
  userLoginwithGoogle,
  userLoginWithMyfates,
} from "../../../store/actions/userAction";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const userReducer = useSelector((store) => store.userReducer);

  const dispatch = useDispatch();
  const router = useNavigate();
  const { search } = useLocation();

  const userChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      dispatch(userLoginwithGoogle(credentialResponse.access_token, router));
    },
    onError: () => {
      dispatch(notiAction("Login Failed"));
    },
  });

  const onSubmitHandler = (event) => {
    const user = userData;
    user.strategy = "email";
    event.preventDefault();
    dispatch(userLogin(user, router));
  };

  useEffect(() => {
    if (search) {
      dispatch(
        userLoginWithMyfates(search.split("?")[1].split("=")[1], router)
      );
    }
  }, [dispatch, router, search]);

  useEffect(() => {
    dispatch(isAuthenticate());
  }, [dispatch, router]);

  return (
    <div className="bg-my-cream p-10 h-full md:h-[100vh] flex justify-center items-center">
      <div className="bg-white max-w-3xl mx-auto flex flex-wrap md:flex-nowrap justify-between p-10 md:p-20 gap-12 items-center flex-col-reverse md:flex-row">
        <div className="space-y-10 w-8/12 md:w-5/12 mx-auto">
          <img src="/images/auth.png" alt="" />
          <p className="text-center">
            <Link
              to={`${import.meta.env.VITE_CLIENT_PANEL_URL}/signup`}
              target="blank"
              className="underline"
            >
              Create an account
            </Link>
          </p>
        </div>
        <form className="w-full md:w-7/12" onSubmit={onSubmitHandler}>
          <p className="tracking-widest text-3xl font-bold">LOGIN</p>
          <div className="space-y-7 mt-10">
            <div>
              <div
                className={`flex gap-3 border-b-2 pb-2 ${
                  userReducer.error?.email
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              >
                <i className="fa-solid fa-user mt-1"></i>
                <input
                  type="text"
                  className="w-full outline-0"
                  placeholder="Your Email"
                  name="email"
                  onChange={userChange}
                />
              </div>
              <p
                className={`text-red-500 text-sm mt-1 ${
                  userReducer.error?.email ? "opacity-100" : "opacity-0"
                }`}
              >
                {userReducer.error?.email}
              </p>
            </div>
            <div>
              <div
                className={`flex gap-3 border-b-2 pb-2 ${
                  userReducer.error?.password
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              >
                <i className="fa-solid fa-lock mt-1"></i>
                <input
                  type="password"
                  className="w-full outline-0"
                  placeholder="Your Password"
                  name="password"
                  onChange={userChange}
                />
              </div>
              <p
                className={`text-red-500 text-sm mt-1 ${
                  userReducer.error?.password ? "opacity-100" : "opacity-0"
                }`}
              >
                {userReducer.error?.password}
              </p>
            </div>
            <button className="bg-gray-900 w-full text-white py-2 text-lg font-semibold rounded">
              Login
            </button>
          </div>
          <div className="mt-5 space-y-5 flex items-center gap-5">
            <p>Or:</p>
            <img
              src="/images/loginbtn.png"
              alt=""
              onClick={() => login()}
              className="cursor-pointer w-6/12 pb-6"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
