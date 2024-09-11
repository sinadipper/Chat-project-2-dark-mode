import { DeleteIcon } from "../../assets/delete";
import { ChatEdit } from "../../assets/chatEdit";
export default function ReceivedMessage({ name, message, date }) {
  return (
    <li className="flex mb-3">
      <span className="bg-[#1a1a2e] h-10 w-10 text-center p-2 rounded-md self-end mr-2 text-white">
        {name.charAt(0)}
      </span>
      <div className="flex flex-col items-start bg-[#16213e] rounded-2xl p-3 min-h-20 max-w-xs">
        <h3 className="font-semibold text-[#c9d6df]">{name}</h3>
        <p className="text-sm text-left break-words text-[#c9d6df]">
          {message}
        </p>
        <span className="text-xs text-[#c9d6df]">
          {new Date(date).toLocaleDateString("fa-ir", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    </li>
  );
}
