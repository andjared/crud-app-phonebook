const contactsList = document.querySelector(".contacts");
const addContact = document.querySelector(".add-contact");

const gatherFormData = (e) => {
  return {
    first_name: e.target.first_name.value,
    last_name: e.target.last_name.value,
    number: e.target.number.value,
    email: e.target.email.value,
    image: "./avatar.jpg",
  };
};

//create new contact in db.json
const createNewContact = (e) => {
  e.preventDefault();
  let newContact = gatherFormData(e);
  return fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newContact),
  })
    .then((res) => res.json())
    .then((contact) => console.log(contact));
};

//click on add button to open form & on submiting creates new contact
const addNewContact = () => {
  addContact.innerHTML = "";
  contactsList.innerHTML = "";
  const contactForm = document.createElement("form");
  contactForm.innerHTML = `
        <form id="create-contact">
            <label for="first_name">First Name:</label>
                <input type="text" name="first_name" id="first_name" required>
            <label for="last_name">Last Name:</label>
                <input type="text" name="last_name" id="last_name" required>
            <label for="number">Phone Number:</label>
                <input type="text" name="number" id="number" required>
            <label for="email">Email:</label>
                <input type="text" name="email" id="email" required>
                <input type="submit" name="submit" id="submit-new">
              
       </form>`;

  addContact.append(contactForm);

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewContact(e);
  });
};
//returns all items from db.json
const getAllContacts = async () => {
  const data = await fetch("http://localhost:3000/contacts");
  const response = await data.json();
  console.log(response);
  return response;
};

//creates HTML template for each contact
const addToDom = (contact) => {
  const contactInfo = document.createElement("li");
  const { id, first_name, last_name, number, email, image } = contact;

  contactInfo.dataset.id = contact.id;
  contactInfo.innerHTML = `
    <div class="contact-info"> 
        <p>${first_name} ${last_name}</p>
        <p>${number}</p>
        <p>${email}</p>
        <img src=${image} />
        <button class="update" id="update-${id}">Update</button>
        <button class="remove" id="remove-${id}">Remove</button>
     </div>`;

  contactsList.appendChild(contactInfo);
};

//add all contacts from db.json to DOM

getAllContacts().then((data) => data.forEach((contact) => addToDom(contact)));

// "image": "https://picsum.photos/id/1005/200/300",
// "image": "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
//"image": "https://picsum.photos/id/1/200/300",
// "image": "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
//"image": "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
//user upload contact image
// function uploadImage(imgInput) {
//
//   // let img = document.querySelector("#uploaded");

//   imgInput.addEventListener("change", function () {
//     let img = document.querySelector("#uploaded");

//     if (this.files && this.files[0]) {
//       img.src = this.files[0].name;
//       console.log(typeof img.src);
//       // img.onload = () => {
//       //   URL.revokeObjectURL(img.src); // no longer needed, free memory
//       // };

//       // img.src = URL.createObjectURL(this.files[0]);
//       // console.log(img.src);
//       // console.log(imgInput.files[0].name);

//       imgSRC = img.src;
//     }
//   });
//   //change later to imgSRC
//   return "https://picsum.photos/id/1/200/300";
// }
