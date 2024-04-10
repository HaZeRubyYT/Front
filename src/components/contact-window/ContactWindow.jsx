import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import {CgProfile} from "react-icons/cg";
import {useState} from "react";
import CardSpace from "./CardSpace.jsx";

export default function ContactWindow({
  myUsername,
  myEmail,
  setPopUp,
  setReason,
  setShowChat,
  textspaceList
}) {
  // State calls for credits popover
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  // console.log(MyEmail);

  return (
    <>
      <div className="w-[26vw] rounded-lg bg-[#181818] shadow-white flex flex-col justify-between h-auto">
        {/* Header */}
        <div className="flex flex-row items-center px-4 py-3 pb-4 rounded-lg rounded-b-2xl bg-[#212121] justify-between drop-shadow-sm">
          <div className="bg-transparent size-6" />
          <Popover open={openPopover} handler={setOpenPopover} placement="left">
            <PopoverHandler {...triggers}>
              <Button
                variant="text"
                ripple={false}
                size="sm"
                className="focus:!outline-none p-0">
                <img
                  src="/assets/logo2.png"
                  alt="chat-logo"
                  className="w-12 h-12"
                />
              </Button>
            </PopoverHandler>
            <PopoverContent className="text-black">
              Made with ❤️ by Shivam Kumar
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverHandler>
              <Button ripple={false} className="p-0 focus:!outline-none">
                <CgProfile className="" size={"1.5rem"} />
              </Button>
            </PopoverHandler>
            <PopoverContent className="">
              <p>
                <span className="font-bold">Username:</span> {myUsername}
              </p>
              <p>
                <span className="font-bold">Email:</span> {myEmail}
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <CardSpace textspaceList={textspaceList} />
        {/* Footer Buttons */}
        <div className="flex flex-col justify-end w-full h-[10vh]">
          <div className="flex flex-row justify-center gap-4 my-4">
            <Button
              onClick={() => {
                setReason("create");
                setPopUp(prevVal => !prevVal);
              }}
              className="w-[10rem] !bg-[#212121] !drop-shadow-sm">
              Create
            </Button>
            <Button
              onClick={() => {
                setReason("join");
                setPopUp(prevVal => {
                  return !prevVal;
                });
              }}
              className="w-[10rem] !bg-[#212121] !drop-shadow-sm">
              Join
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
