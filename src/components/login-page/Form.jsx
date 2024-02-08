import SignUpForm from "./SignUpForm.jsx";
import LoginForm from "./LoginForm.jsx";
import {useState} from "react";
// import logo from "/assets/logo.png";

export default function Login({changeLoginState, socket}) {
  const [signUpForm, setSignUpForm] = useState(true);

  function changeForm() {
    setSignUpForm(prevValue => !prevValue);
  }

  function emitNewUser(userData) {
    if (socket) {
      socket.emit("login", userData);
      console.log("Logged In!");
    }
  }
  return (
    <div className="bg-[#212838] flex h-[100vh] w-[100vw] items-center justify-between">
      <img src="/public/assets/logo.png" alt="chat-app-logo" className="ml-12" />
      <div className="bg-black opacity-90 login-div h-[100vh] w-[50vw] flex flex-col items-center p-4 backdrop-blur-sm">
        <h1 className="text-white text-[3.5rem] p-3">
          {signUpForm ? "Create Account" : "Login"}
        </h1>
        {signUpForm ? (
          <SignUpForm
            changeLoginState={changeLoginState}
            emitNewUser={emitNewUser}
            changeForm={changeForm}
          />
        ) : (
          <LoginForm
            changeLoginState={changeLoginState}
            changeForm={changeForm}
          />
        )}
      </div>
    </div>
  );
}
