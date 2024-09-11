import Interface from "./components/Interface";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userFullName, setUserFullName] = useState("");
  console.log(allChats);
  const myToken: string =
    "JTdCJTIydXNlcm5hbWUlMjIlM0ElMjIwOTAwMDAwMDAwMCUyMiUyQyUyMnBhc3N3b3JkJTIyJTNBJTIyMTIzNDU2NzhBYSU0MCUyMiUyQyUyMm5hbWUlMjIlM0ElMjIlRDklODElRDglQjElRDglQTclRDklODglREIlOEMlRDklODYlMjIlMkMlMjJkYXRlJTIyJTNBJTIyMjAyMy0xMC0yNVQwNCUzQTIyJTNBNTYuODMzWiUyMiU3RA==";
  // console.log(chats);
  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(
          "https://farawin.iran.liara.run/api/contact",
          {
            method: "GET",
            headers: {
              Authorization: myToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error in HTTP request");
        }
        const data = await response.json();
        setContacts(data.contactList);
        console.log(data);
      } catch (error) {
        console.error("There was an error in fetching the contacts", error);
      }
    }

    fetchContacts();
  }, []);

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch(
          "  https://farawin.iran.liara.run/api/chat",
          {
            method: "GET",
            headers: {
              Authorization: myToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error in HTTP request");
        }
        const data = await response.json();
        setAllChats(data.chatList);
        // console.log(data.chatList);
      } catch (error) {
        console.error("There was an error in fetching the chats", error);
      }
    }

    if (isLoggedIn) {
      fetchChats();
    }
  }, [isLoggedIn]);

  function handleLogin() {
    const user = contacts.find(
      (contact) => contact.username === username && contact.ref === password
    );
    if (user) {
      setIsLoggedIn(true);
      setUserFullName(user.name);
    } else {
      alert("Invalid username or password!");
    }
  }
  const filteredContacts = contacts.reduce((uniqueContacts, contact) => {
    const contactChats = allChats?.filter(
      (chat) =>
        (chat.sender === contact.username && chat.receiver === username) ||
        (chat.receiver === contact.username && chat.sender === username)
    );

    const isAlreadyAdded = uniqueContacts.some(
      (uniqueContact) => uniqueContact.username === contact.username
    );

    if (!isAlreadyAdded && contactChats.length > 0) {
      uniqueContacts.push({
        ...contact,
        chatList: contactChats,
      });
    }

    return uniqueContacts;
  }, []);

  // console.log("Filtered contacts with chats:", filteredContacts);

  return (
    <main className="w-screen h-screen bg-[#1a1a2e] overflow-hidden">
      {isLoggedIn ? (
        <Interface
          contacts={filteredContacts}
          allChats={allChats}
          userFullName={userFullName}
          setAllChats={setAllChats}
          myToken={myToken}
          username={username}
        />
      ) : (
        <LoginModal
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </main>
  );
}
