import SignUpForm from "./SignUpForm.jsx";
import LoginForm from "./LoginForm.jsx";
import {useState} from "react";
import {MongoClient} from "mongodb";

// import logo from "/assets/logo.png";

export default function Form({
  changeLoginState,
  setMyEmail,
  setMyUsername,
  joinRooms,
}) {
  const [signUpForm, setSignUpForm] = useState(true);
  const [loginError, setError] = useState("");

  const uri =
    "mongodb+srv://shivamkumar:kumar820@cluster820.ltuebcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster820";

  const client = new MongoClient(uri);

  // MongoDB Functions
  async function connectToMongoDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error(err);
    }
  }

  async function closeMongoDBConnection() {
    try {
      await client.close();
      console.log("Disconnected from MongoDB");
    } catch (err) {
      console.error(err);
    }
  }

  function changeForm() {
    setSignUpForm(prevValue => !prevValue);
  }

  // connectToMongoDB().then(async ()=> {}).finally(closeMongoDBConnection())

  function emitNewUser(userData) {
    // socket.emit("add new user", userData);
    connectToMongoDB()
      .then(async () => {
        const db = client.db("quick-chat");
        const userData = db.collection("userData");

        if (userData != undefined) {
          try {
            await userData.insertOne(userData);
          } catch (err) {
            console.error(err);
          }
        }
      })
      .finally(closeMongoDBConnection());

    setMyEmail(userData.email);
    setMyUsername(userData.username);
    console.log("Logged In!");
  }

  function checkLogin(loginData) {
    // if (socket) {
    //   socket.emit("check login", loginData);
    // }
    connectToMongoDB()
      .then(async () => {
        if (loginData != undefined) {
          const db = client.db("quick-chat");
          const userData = db.collection("userData");
          const data = await userData.findOne({
            email: loginData.email,
            password: loginData.password,
          });
          if (data != null) {
            joinRooms(loginData.email, -1);
          } else {
            setError("Invalid Email or Password. Please try again");
          }
        }
      })
      .finally(closeMongoDBConnection());
  }

  return (
    <div className="bg-[#212838] flex h-[100vh] w-[100vw] items-center justify-between">
      <img src="/assets/logo.png" alt="chat-app-logo" className="ml-12" />
      <div className="bg-black opacity-90 login-div h-[100vh] w-[50vw] flex flex-col items-center p-4 backdrop-blur-sm">
        <h1 className="text-white text-[3.5rem] p-3">
          {signUpForm ? "Create Account" : "Login"}
        </h1>
        {signUpForm ? (
          <SignUpForm
            changeLoginState={changeLoginState}
            emitNewUser={emitNewUser}
            changeForm={changeForm}
            connectToMongoDB={connectToMongoDB}
            closeMongoDBConnection={closeMongoDBConnection}
            client={client}
          />
        ) : (
          <LoginForm
            changeLoginState={changeLoginState}
            changeForm={changeForm}
            checkLogin={checkLogin}
            loginError={loginError}
          />
        )}
      </div>
    </div>
  );
}
