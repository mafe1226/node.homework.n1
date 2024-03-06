const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading contacts file:', err);
      return;
    }
    console.log('Contacts:');
    console.log(data);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading contacts file:', err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);
    if (contact) {
      console.log('Contact found:', contact);
    } else {
      console.log('Contact not found');
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading contacts file:', err);
      return;
    }
    let contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), err => {
      if (err) {
        console.error('Error removing contact:', err);
        return;
      }
      console.log('Contact removed successfully');
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading contacts file:', err);
      return;
    }
    let contacts = JSON.parse(data);
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), err => {
      if (err) {
        console.error('Error adding contact:', err);
        return;
      }
      console.log('Contact added successfully');
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
