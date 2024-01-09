// import React from "react";
import {useEffect, useState} from "react";
import InputArea from "./InputArea";
import Message from "./Message";

export default function ChatWindow({
  // message,
  // senderName,
  sendMessage,
  changeInput,
  input,
  allUsername,
  socket,
  myUsername,
}) {
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    // Function call to get all messages
    socket?.on("get messages", allMessageList => {
      setAllMessages(allMessageList);
    });
  }, [socket]);
  // console.log(allMessages);
  // console.log(allUsername.filter(userObj => userObj.id == allMessages[0].id));
  return (
    <div className="w-[71.5vw] h-auto border rounded-lg flex flex-col text-white justify-between">
      <div className="message-div overflow-y-auto">
        {allMessages?.map(messageObj => {
          const username = allUsername.filter(
            userObj => userObj.id == messageObj.id,
          );
          console.log(allUsername);
          return (
            <Message
              key={messageObj.messageID}
              message={messageObj.message}
              time={messageObj.time}
              username={username[0]?.user}
              myUsername={myUsername}
            />
          );
        })}
      </div>

      <div className="">
        <hr className="mt-2" />
        <InputArea
          sendMessage={sendMessage}
          changeInput={changeInput}
          input={input}
        />
      </div>
    </div>
  );
}
