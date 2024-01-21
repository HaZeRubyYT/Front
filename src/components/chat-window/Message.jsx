export default function Message({
  message,
  time,
  username,
  myUsername,
  showData,
}) {
  // console.log(showData);
  return (
    <div
      className={`flex ${
        username === myUsername ? "flex-row-reverse" : "flex-row"
      } justify-start p-1 `}>
      <div
        className={
          "flex flex-col " +
          (username !== myUsername ? "items-start" : "items-end")
        }>
        {showData && (
          <p className="text-white m-0 p-0">
            {username !== myUsername ? username : "You"}
          </p>
        )}
        <div
          className={
            (username !== myUsername ? "bg-[#0D7377]" : "bg-[#14d4ff7f]") +
            " p-2 text-white rounded-lg shadow-md"
          }>
          <p className="">{message}</p>
          {showData && <p className="text-neutral-300 text-[0.25rem]">{time}</p>}
        </div>
      </div>
    </div>
  );
}
