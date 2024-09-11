import Searchbar from "./Searchbar";
import ContactList from "./ContactList";
import { useState } from "react";
import staticContactList from "../../../contactListStatic";
export default function ContactsNav({ setSelectedContact, contacts }) {
  const [searchedContact, setSearchedContact] = useState("");
  const [foundContact, setFoundContact] = useState(null);

  function handleFind(event) {
    const searchedText = event.target.value;
    setSearchedContact(searchedText);

    if (searchedText.trim() === "") {
      setFoundContact(null);
    } else {
      const filteredContact = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchedText.toLowerCase())
      );
      setFoundContact(filteredContact);
    }
  }

  return (
    <section className="border-l-[#30475e] border-l-2 w-auto min-w-80">
      <Searchbar handleFind={handleFind} searchedContact={searchedContact} />
      <ContactList
        foundContact={foundContact}
        setSelectedContact={setSelectedContact}
        contacts={contacts}
      />
    </section>
  );
}
