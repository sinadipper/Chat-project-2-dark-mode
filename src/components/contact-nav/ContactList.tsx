import { Contact } from "../Contact";

export default function ContactList({
  foundContact,
  setSelectedContact,
  contacts,
}) {
  // function handleSelectedContact(contact) {
  //   setSelectedContact(contact);
  // }

  const contactsToRender =
    foundContact && foundContact.length > 0 ? foundContact : contacts;

  return (
    <aside className="flex flex-col h-full div__contacts--list mt-6 border-l-[#30475e]">
      <ul className="flex flex-col flex-1 gap-y-4 overflow-y-auto">
        {contactsToRender.length > 0 ? (
          contactsToRender.map((contact, i) => (
            <Contact
              key={`${contact.name}${i}`}
              name={contact.name}
              date={new Date(contact.date).toLocaleString("fa-ir")}
              mobile={contact.username}
              chats={contact.chatList || []}
              setSelectedContact={setSelectedContact}
            />
          ))
        ) : (
          <li className="text-center">No contacts available</li>
        )}
      </ul>
    </aside>
  );
}
