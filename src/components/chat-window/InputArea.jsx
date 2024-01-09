import {BiSolidSend} from "react-icons/bi";

export default function InputArea({input, changeInput, sendMessage}) {
  return (
    <form
      className="flex self-end flex-grow text-black justify-center h-[8vh] items-center gap-3 mx-3 my-2"
      onSubmit={e => {
        e.preventDefault();
      }}>
      <input
        className="h-[6vh] w-[69vw] rounded-[1.75rem] p-2"
        type="text"
        placeholder="Send Message"
        onChange={changeInput}
        value={input}
        autoFocus
      />
      <button
        className="text-white border-2 h-[6vh] w-[3vw] rounded-[1.7rem] p-1"
        type="submit"
        onClick={() => {
          if (input.trim().length > 0) {
            sendMessage();
          }
        }}>
        <BiSolidSend />
      </button>
    </form>
  );
}
