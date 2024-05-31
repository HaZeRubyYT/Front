import {useCallback, useEffect, useState} from "react";
// import {io} from "socket.io-client";
import ChatWindow from "./components/chat-window/ChatWindow.jsx";
import ContactWindow from "./components/contact-window/ContactWindow.jsx";
import Form from "./components/login-page/Form.jsx";
import Modal from "./components/contact-window/Modal.jsx";
// import {useSocketContext} from "./SocketContext.jsx";
import {SocketProvider} from "./SocketProvider.jsx";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [showChat, setShowChat] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [message, changeMessage] = useState("Hi");
  const [input, setInput] = useState("");
  const [myUsername, setMyUsername] = useState();
  const [myEmail, setMyEmail] = useState();
  const [allUsername, setAllUsernames] = useState([]);
  const [showPopUp, setPopUp] = useState(false);
  const [popUpReason, setReason] = useState("");
  const [textspaceList, setList] = useState("");
  // const [prevent, setPrevent] = useState(false);
  // const [senderName, setSenderName] = useState();
  // const [allMessages, setAllMessages] = useState([]);

  const socket = useSocketContext();

  function changeInput(e) {
    setInput(e.target.value);
  }

  // const changeList = useCallback(content => {
  //   setList(content);
  // }, []);

  // const connectSocket = useCallback(() => {
  //   const socket = io("http://localhost:3001", {});
  //   setSocket(socket);
  // }, []);

  const changeLoginState = useCallback(fix => {
    if (fix) {
      setLogin(true);
    } else {
      setLogin(prevValue => !prevValue);
    }
  }, []);

  const updateUserDetails = useCallback((email, username) => {
    setMyEmail(email);
    setMyUsername(username);
  }, []);

  // Function call for sending a message
  function joinRooms(email, toJoin) {
    socket.emit("join room", email, toJoin, res => {
      console.log(res);
    });
  }

  function sendMessage() {
    if (socket) {
      socket.emit("sent message", input, myUsername);
      setInput("");
    }
  }
  // Function call for emitting a new Textspace
  function emitNewTextSpace(title) {
    if (socket) {
      socket.emit("new textspace", title, myUsername, myEmail);
    }
  }
  function emitJoinTextSpace(pin) {
    if (socket) {
      socket.emit("join room", myEmail, pin, res => {
        console.log(res, "join room result");
      });
    }
  }

  // useEffect for main socket
  // useEffect(() => {
  // const socket = io("http://localhost:3001", {});
  // setSocket(socket);
  // Function call to let the server initialize
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("init");
      console.log("Hi");
    });

    socket.on("login", (email, username) => {
      socket.emit("join room", email, -1, res => {
        console.log(res);
      });
      changeLoginState(true);
      updateUserDetails(email, username);
      // emitJoinTextSpace(-1);
    });
    // socket.on("prevent", () => {
    //   setPrevent(val => {
    //     console.log(!val);
    //     return !val;
    //   });
    // });

    // Function call to get room IDs and names
    socket.on("get user textspace", (textSpaceArray, roomsArray, callback) => {
      callback();
      console.log("Hi I have arrived");
      console.log(roomsArray, textSpaceArray);
    });
    // Function call to get usernames
    socket.on("get username", list => {
      setAllUsernames(list);
      for (let obj of list) {
        if (obj.id == socket.id) {
          // setMyUsername(obj.user);
        }
      }
    });

    // Function call for recieving messages
    socket.on("chat message", message => {
      console.log(`Received message: ${message}`);
      changeMessage(message);
    });

    return () => {
      socket.off("connect");
      socket.off("login");
      socket.off("get user textspace");
      socket.off("get username");
      socket.off("chat message");
    };
  }, [socket, changeLoginState, updateUserDetails]);

  // socket.on("disconnect", () => {
  //   socket.disconnect();
  // });
  // }, [changeLoginState, socket, updateUserDetails]);

  return isLogin ? (
    <SocketProvider>
      {showPopUp && (
        <Modal
          setPopUp={setPopUp}
          popUpReason={popUpReason}
          emitNewTextSpace={emitNewTextSpace}
          emitJoinTextSpace={emitJoinTextSpace}
          socket={socket}
        />
      )}
      <div className="flex justify-between h-[100vh] w-[100vw] bg-[#000] py-[2vh] px-[0.5vw] text-white">
        <ContactWindow
          myUsername={myUsername}
          myEmail={myEmail}
          setPopUp={setPopUp}
          setReason={setReason}
          setShowChat={setShowChat}
          textspaceList={textspaceList}
        />
        <ChatWindow
          message={message}
          myUsername={myUsername}
          allUsername={allUsername}
          sendMessage={sendMessage}
          changeInput={changeInput}
          input={input}
          socket={socket}
          showChat={showChat}
        />
        {/* <button onClick={emit} className="bg-white size-3"></button> */}
      </div>
    </SocketProvider>
  ) : (
    <Form
      changeLoginState={changeLoginState}
      setMyEmail={setMyEmail}
      setMyUsername={setMyUsername}
      joinRooms={joinRooms}
    />
  );
}

export default App;
