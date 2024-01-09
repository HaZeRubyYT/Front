export default function Message({message, time, username, myUsername}) {
  return (
    <div className={`flex ${username == myUsername ? "justify-end" : ""} p-2 `}>
      <div className="">
        <p className="inline-block text-white">
          {username != myUsername ? username : "You"}
        </p>
        <p className="text-neutral-400 text-sm">{time}</p>
        <p className="rounded-sm border p-2">{message}</p>
      </div>
    </div>
  );
}
