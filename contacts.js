const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function getContacts() {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    return JSON.parse(contactsData);
}

function saveContacts(contacts) {
    const contactsJson = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(contactsPath, contactsJson);
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}


function listContacts() {
    const contacts = getContacts();
    console.table(contacts);
}

function getContactById(contactId) {
    const contacts = getContacts();
    const contact = contacts.find((item) => item.id === contactId);
    console.log(contact);
}

function removeContact(contactId) {
    let contacts = getContacts();
    contacts.filter((item) => item.id !== contactId);
    saveContacts(contacts);
    console.log(`Contacto con id ${contactId} removido.`);
}

function addContact(name, email, phone) {
    const contacts = getContacts();
    const newContact = {
        id: generateId(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    saveContacts(contacts);
    console.log("Contacto agregado:", newContact);
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}