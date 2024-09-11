import { DeleteIcon } from "../../assets/delete";
import { ChatEdit } from "../../assets/chatEdit";
import { useState } from "react";

export default function SentMessage({
  name,
  message,
  id,
  date,
  setAllChats,
  myToken,
}) {
  console.log("Initial props:", { name, message, id, date });
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  async function handleDeleteMessage() {
    try {
      const response = await fetch("https://farawin.iran.liara.run/api/chat", {
        method: "DELETE",
        headers: { Authorization: myToken, "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error deleting message: ${response.status}`);
      }
      setAllChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  }

  async function handleEditMessage() {
    // console.log("Edited message:", editedMessage);

    try {
      const response = await fetch("https://farawin.iran.liara.run/api/chat", {
        method: "PUT",
        headers: {
          Authorization: myToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, textHtml: editedMessage }),
      });

      if (!response.ok) {
        throw new Error(`Error while editing message ${response.status}`);
      }

      const updatedChatsResponse = await fetch(
        "https://farawin.iran.liara.run/api/chat",
        {
          headers: { Authorization: myToken },
        }
      );

      if (!updatedChatsResponse.ok) {
        throw new Error(
          `Error fetching updated chats: ${updatedChatsResponse.status}`
        );
      }

      const updatedChatsData = await updatedChatsResponse.json();
      // console.log("Updated chats data:", updatedChatsData);

      if (Array.isArray(updatedChatsData.chatList)) {
        setAllChats(updatedChatsData.chatList);
      } else {
        console.error("Updated chats data is not an array:", updatedChatsData);
        throw new Error("Invalid chats data format");
      }

      setIsEditing(false);
      console.log("Message was edited successfully");
    } catch (error) {
      console.error("Failed to edit message", error);
    }
  }
  return (
    <li className="flex mb-3 justify-end">
      <div className="flex flex-col items-end relative">
        <div className="flex flex-row-reverse items-center">
          <span className="bg-[#3498DB] h-10 w-10 text-center p-2 rounded-md mb-1 ml-2 self-end text-white">
            {name.charAt(0)}
          </span>
          <div className="bg-[#1a659e] text-white rounded-2xl p-2 min-h-20 max-w-xs">
            <h3 className="text-right font-semibold">{name}</h3>
            {isEditing ? (
              <input
                value={editedMessage}
                onChange={(e) => {
                  setEditedMessage(e.target.value);
                }}
                className="text-sm text-right break-words p-1 rounded-md w-full text-black"
              />
            ) : (
              <p className="text-sm text-right break-words">{message}</p>
            )}
            <span className="text-xs text-[#c9d6df]]">
              {new Date(date).toLocaleDateString("fa-ir", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
            <div className="flex flex-row-reverse gap-2">
              <button onClick={handleDeleteMessage}>
                <DeleteIcon />
              </button>
              {isEditing ? (
                <>
                  <button onClick={handleEditMessage}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)}>
                  <ChatEdit />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
