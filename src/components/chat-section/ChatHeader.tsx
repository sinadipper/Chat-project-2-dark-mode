import { DeleteIcon } from "../../assets/delete";
import { EditIcon } from "../../assets/edit";
import { LogoutIcon } from "../../assets/logout";
export default function ChatHeader({ selectedContact }) {
  return (
    <div className=" div__contact--header items-center hover:cursor-pointer  hover:bg-[#3498DB] rounded-2xl h-14 w-full flex flex-row-reverse p-1 bg-[#2C3E50] ">
      <span className="ml-3 inline-block w-12 h-12 p-3 pr-5 rounded-lg bg-[#3498DB] mr-3 ">
        {selectedContact.name.charAt(0)}
      </span>
      <div className="flex flex-col ml-auto">
        <h3 className="ml-auto text-[#F0F4F8]">{selectedContact.name}</h3>
        <p className="text-xs text-[#F0F4F8] inline">
          {selectedContact.mobile}
        </p>
      </div>
      <div className="flex mr-auto ml-3 gap-2">
        <span className="text-[16px] text-[#F0F4F8]">
          <DeleteIcon />
        </span>
        <span className="text-[#F0F4F8] ">
          <EditIcon />
        </span>
        <span className="text-[#F0F4F8]">
          <LogoutIcon />
        </span>
      </div>
    </div>
  );
}
