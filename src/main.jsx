import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import setAuthToken from "../utils/setAuthToken";
import store from "../store";
import "./i18n";
import "./index.css";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
