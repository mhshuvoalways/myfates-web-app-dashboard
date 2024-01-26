import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Tostify = () => {
  const tostify = useSelector((store) => store.notiReducer);

  useEffect(() => {
    if (tostify) {
      toast(tostify, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [tostify]);

  return <ToastContainer />;
};

export default Tostify;