import { useEffect, useState } from "react";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

export default function ChatsList({
  selectedContact,
  userFullName,
  allChats,
  username,
  setAllChats,
  myToken,
}) {
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    // console.log("Selected Contact:", selectedContact);
    // console.log("All Chats:", allChats);
    // console.log("Username:", username);

    if (selectedContact) {
      const relevantChats = allChats.filter(
        (chat) =>
          chat &&
          chat.sender &&
          chat.receiver &&
          ((chat.sender === selectedContact.mobile &&
            chat.receiver === username) ||
            (chat.receiver === selectedContact.mobile &&
              chat.sender === username))
      );

      // console.log("Filtered Chats:", relevantChats);
      setFilteredChats(relevantChats);
    }
  }, [selectedContact, allChats, username]);
  console.log;
  return (
    <div className="h-full w-full p-3 flex flex-col-reverse overflow-y-auto">
      <ul className="w-full flex flex-col space-y-3">
        {filteredChats.length === 0 && <li>No chats available</li>}
        {filteredChats.map((chat, i) =>
          chat.sender === selectedContact.mobile ? (
            <ReceivedMessage
              key={`${chat.date}-${i}`}
              name={selectedContact.name}
              message={chat.text}
              date={chat.date}
            />
          ) : (
            <SentMessage
              key={`${chat.date}-${i}`}
              name={userFullName}
              message={chat.text}
              date={chat.date}
              id={chat.id}
              setAllChats={setAllChats}
              myToken={myToken}
            />
          )
        )}
      </ul>
    </div>
  );
}

