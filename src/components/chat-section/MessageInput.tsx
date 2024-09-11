import { Attachment } from "../../assets/attach";
import { SendMessage } from "../../assets/sendMessage";
import { useState } from "react";

export default function MessageInput({
  handleAddMessage,
  myToken,
  selectedContact,
  username,
  setAllChats,
}) {
  const [message, setMessage] = useState("");
  //console.log(selectedContact);
  async function handleSendMessage() {
    // console.log("Send message triggered");

    if (message.trim()) {
      const newMessage = {
        contactUsername: selectedContact?.mobile,
        textHtml: message,
      };

      //   console.log("New message to send:", JSON.stringify(newMessage));

      if (!newMessage.contactUsername) {
        console.error("contactUsername is missing or undefined");
        alert("Cannot send message: contactUsername is missing.");
        return;
      }

      try {
        const response = await fetch(
          "https://farawin.iran.liara.run/api/chat",
          {
            method: "POST",
            headers: {
              Authorization: myToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
          }
        );

        //      console.log("Response status:", response.status);

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error(errorResponse);
          throw new Error(
            `Sending message failed! Response status: ${response.status}`
          );
        }

        const savedMessage = await response.json();
        //   console.log("Saved message:", savedMessage);

        handleAddMessage({
          sender: username,
          receiver: selectedContact.userName,
          text: savedMessage.textHtml,
          date: savedMessage.date || new Date().toISOString(),
        });
        await refetchChats();
        setMessage("");
      } catch (error) {
        console.error("Error during sending message:", error);
        alert("Error while sending the message: " + error.message);
      }
    }
  }

  async function refetchChats() {
    try {
      const response = await fetch("https://farawin.iran.liara.run/api/chat", {
        method: "GET",
        headers: {
          Authorization: myToken,
        },
      });
      if (!response.ok) {
        throw new Error("Error in HTTP request");
      }
      const data = await response.json();
      setAllChats(data.chatList);
    } catch (error) {
      console.error("There was an error in fetching the chats", error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  }
  return (
    <div className="flex flex-row-reverse bg-[#1a1a2e] h-12 items-center rounded-[10px] gap-4">
      <button className="mr-3 text-l  text-[#fff]">
        <Attachment />
      </button>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        className="p-1 bg-[#1a1a2e] text-white border-none outline-none text-sm input__search--name inline-block w-full input__message-input text-start text-[13px]"
        placeholder="پیامتان را وارد کنید"
      />
      <button onClick={handleSendMessage} className="ml-5 text-xl  text-[#fff]">
        <SendMessage />
      </button>
    </div>
  );
}
