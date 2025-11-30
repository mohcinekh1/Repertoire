import React, { createContext, useState, useContext } from 'react';

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);

    const addContact = (contact) => {
        const newContact = {
            id: Date.now().toString(),
            ...contact,
        };
        setContacts([...contacts, newContact]);
    };

    const updateContact = (id, updatedContact) => {
        setContacts(contacts.map(contact =>
            contact.id === id ? { ...contact, ...updatedContact } : contact
        ));
    };

    const deleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <ContactsContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
            {children}
        </ContactsContext.Provider>
    );
};

export const useContacts = () => useContext(ContactsContext);