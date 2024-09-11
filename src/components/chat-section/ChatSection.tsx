import ChatHeader from "./ChatHeader";
import ChatsList from "./ChatsList";
import MessageInput from "./MessageInput";
export default function ChatSection({
  selectedContact,
  setSelectedContact,
  username,
  userFullName,
  allChats,
  setAllChats,
  myToken,
}) {
  function handleAddMessage(message) {
    setSelectedContact((prevContact) => ({
      ...prevContact,
      myChats: [...prevContact.myChats, message],
    }));
    setAllChats((prevChats) => [...prevChats, message]);
  }
  return (
    <section className="w-full h-full flex flex-col p-1 bg-[#F2F4F7]">
      {selectedContact.name && (
        <>
          <ChatHeader selectedContact={selectedContact} />
          <ChatsList
            selectedContact={selectedContact}
            userFullName={userFullName}
            allChats={allChats}
            setAllChats={setAllChats}
            username={username}
            setAllChats={setAllChats}
            myToken={myToken}
          />
          <MessageInput
            handleAddMessage={handleAddMessage}
            myToken={myToken}
            username={username}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            setAllChats={setAllChats}
          />
        </>
      )}
    </section>
  );
}
