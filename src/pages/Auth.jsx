import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginCompo from "../components/auth";

const Login = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <LoginCompo />
    </GoogleOAuthProvider>
  );
};

export default Login;