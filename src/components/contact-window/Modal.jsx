import {IoMdClose, IoMdAdd} from "react-icons/io";
import {IoEnterOutline} from "react-icons/io5";
import {Button, Input, Typography} from "@material-tailwind/react";
// import {useState} from "react";

export default function Modal({
  setPopUp,
  popUpReason,
  emitNewTextSpace,
  emitJoinTextSpace,
  socket,
}) {
  // const [error, setError] = useState();

  const toCapitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="absolute z-10 flex items-center justify-center backdrop-blur-sm size-full">
      <div className="relative flex flex-col rounded-2xl w-[40vw] h-[20vw] bg-[#090909] justify-center items-center">
        <Typography
          variant="h6"
          className="!absolute top-0 left-0 text-white p-3 pl-5 font-medium">
          {toCapitalize(popUpReason)}
        </Typography>
        <Button
          onClick={() => setPopUp(prevVal => !prevVal)}
          className="!absolute top-0 right-0 bg-transparent !shadow-none hover:bg-red-400 rounded-none rounded-bl-xl rounded-tr-2xl">
          <IoMdClose className="text-xl text-white" />
        </Button>

        {/* If Create Button is clicked, this part will be shown */}
        {popUpReason === "create" && (
          <>
            <form
              onSubmit={e => {
                if (e.target.title.value.trim().length > 0) {
                  emitNewTextSpace(e.target.title.value);
                  setPopUp(false);
                } else {
                  alert("Type Something");
                }
                e.preventDefault();
              }}
              className="flex flex-col gap-4">
              <Typography variant="h2" className="text-center text-white">
                Enter Textspace Title
              </Typography>
              <div className="flex flex-row">
                <Input
                  type="text"
                  name="title"
                  placeholder="Textspace Title"
                  size="lg"
                  className="bg-white !border-t-white-200 focus:!border-t-gray-900 !w-96"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  autoComplete="false"
                />
                <Button type="submit" className="p-3">
                  <IoMdAdd className="text-xl" />
                </Button>
              </div>
            </form>
          </>
        )}
        {popUpReason === "join" && (
          <>
            <form
              onSubmit={e => {
                if (e.target.pin.value.trim().length > 0) {
                  if (socket) {
                    socket.emit("check room pin", e.target.pin.value, res => {
                      if (res.status === "ok") {
                        emitJoinTextSpace(e.target.pin.value);
                        setPopUp(false);
                      } else {
                        alert(res.status);
                      }
                    });
                  }
                } else {
                  alert("Type Something");
                }
                e.preventDefault();
              }}
              className="flex flex-col gap-4">
              <Typography variant="h2" className="text-center text-white">
                Enter Textspace Pin
              </Typography>
              <div className="flex flex-row">
                <Input
                  type="text"
                  name="pin"
                  placeholder="Textspace Pin"
                  size="lg"
                  className="bg-white !border-t-white-200 focus:!border-t-gray-900 !w-72"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  autoComplete="false"
                />
                <Button type="submit" className="p-3">
                  <IoEnterOutline className="text-xl" />
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
