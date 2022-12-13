// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);




let contacts = loadContacts();

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === "search-email") {
    findByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
  loadContacts();
}


function addContact() {
  let name = {name: prompt("Enter Full Name:")};
  let phone = {phone: prompt("Enter Phone Number:")};
  let country = {country: prompt("Enter Country")};
  let email = {email: prompt("Enter Email:")};

    let newContact = Object.assign(name, email, phone, country);
    JSON.stringify(newContact);
    contacts.push(newContact);
    outputEl.innerHTML = `${newContact.name} has been added as a contact.`;
    saveContacts();
  } 



function removeContact() {
  let index = +prompt("Enter the # of the contact you want to remove.");
  if (index >= 0 && index < contacts.length){
    contacts.splice(index, 1);
      saveContacts();
      displayContacts();
    }
    
    outputEl.innerHTML = `${index} has been been removed from the contacts.`;
  }


function displayByName() {
  let nameSearch = prompt("Enter Name:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    let names = contacts[i].name;
    if (names.includes(nameSearch)) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputStr;
}




function findByEmail() {
  let emails = prompt("Search by email:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    let contactEmail = contacts[i].email;
    if (contactEmail.includes(emails)) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputStr;
}






function getContactHTMLStr(contact, i) {
  return `
    <div>
    ${i}: ${contact.name} 
      <br>
      ${contact.email} 
      <br>
      ${contact.phone} (${contact.country})
    </div> 
    `;
}


function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}


function loadContacts() {
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
}

