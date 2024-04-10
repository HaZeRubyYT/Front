// import React from "react";
import {useEffect, useState, useRef} from "react";
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
  showChat,
}) {
  const [allMessages, setAllMessages] = useState([]);
  const scrollDiv = useRef(null);

  useEffect(() => {
    // Function call to get all messages
    socket?.on("get messages", allMessageList => {
      setAllMessages(allMessageList);
    });
  }, [socket]);
  // console.log(allMessages);
  // console.log(allUsername.filter(userObj => userObj.id == allMessages[0].id));
  return (
    <div className="w-[72vw] h-auto rounded-lg flex flex-col text-white justify-between bg-[#212121]">
      {showChat ? (
        <>
          <div className="px-3 overflow-y-auto message-div">
            {allMessages?.map((messageObj, index) => {
              const username = allUsername.filter(
                userObj => userObj.id == messageObj.id,
              );
              {
                /* console.log(allUsername); */
              }
              return (
                <Message
                  key={messageObj.messageID}
                  message={messageObj.message}
                  time={messageObj.time}
                  username={username[0]?.user}
                  myUsername={myUsername}
                  showData={
                    allMessages[index - 1]
                      ? allMessages[index].id == allMessages[index - 1].id &&
                        allMessages[index].milliseconds -
                          allMessages[index - 1].milliseconds <=
                          30000
                        ? false
                        : true
                      : true
                  }
                />
              );
            })}
            <div className="p-0 m-0 scroll-div" ref={scrollDiv}></div>
          </div>
          <div className="input-area">
            <hr className="mt-2" />
            <InputArea
              sendMessage={sendMessage}
              changeInput={changeInput}
              input={input}
              scrollDiv={scrollDiv}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-row items-center justify-center h-full gap-2">
          <h1 className="text-3xl text-white opacity-25 hover:opacity-50 animate-pulse hover:animate-none">
            Enter a Textspace to Begin your Conversation
          </h1>
        </div>
      )}
    </div>
  );
}
