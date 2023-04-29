const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (read === true) return `${title} by ${author}, ${pages} pages, read`;
    return `${title} by ${author}, ${pages} pages, not read yet`;
  };
}

Book.prototype.toggleRead = function () {
  if (this.read) this.read = false;
  else this.read = true;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
}

function showBook() {
  const data = document.querySelector('.data');
  data.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    let value;
    if (myLibrary[i].read) value = 'Read';
    else value = 'Not Read';
    const childDiv = document.createElement('tr');
    childDiv.className = 'data-row';
    childDiv.innerHTML = `<td>${myLibrary[i].title} </td>
	<td>${myLibrary[i].author} </td> 
	<td>${myLibrary[i].pages}</td> <td>
	<button class="btn" id=${i}>${value}</button></td> <td><button class='dbtn' id=d${i}>Delete</button></td>`;
    data.appendChild(childDiv);

    const button = childDiv.querySelector('.btn');
    button.addEventListener('click', () => {
      myLibrary[i].toggleRead();
      showBook();
    });

    const dbutton = childDiv.querySelector('.dbtn');
    dbutton.addEventListener('click', () => {
      myLibrary.splice(i, 1);
      showBook();
    });
  }
}

function handleForm(event) {
  const form = document.querySelector('form');
  event.preventDefault();

  let ok = true;

  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const read = document.getElementById('read');



  console.log('title value:', title.value); // add this line
  const isTitleValid = title.value.length === 0 || textRegExp.test(title.value);
  if (!isTitleValid) {
    title.className = "invalid";
    titleError.textContent = "I expect a valid title, darling!";
    titleError.className = "error active";
    ok =  false;
  } else {
    title.className = "valid";
    titleError.textContent = "";
    titleError.className = "error";
  }

  const isAuthorValid = author.value.length === 0 || textRegExp.test(author.value);
  if (!isAuthorValid) {
    author.className = "invalid";
    authorError.textContent = "I expect a valid author, darling!";
    authorError.className = "error active";
    ok =  false;
  } else {
    author.className = "valid";
    authorError.textContent = "";
    authorError.className = "error";
  }

  const isPagesValid = pages.value > 0 ;
  if (!isPagesValid) {
    pages.className = "invalid";
    pagesError.textContent = "I expect a positive number, darling!";
    pagesError.className = "error active";
    ok =  false;
  } else {
    pages.className = "valid";
    pagesError.textContent = "";
    pagesError.className = "error";
  }

  if (ok==true) {
    
    console.log(title.value, author.value, pages.value, read.checked);
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    showBook();
    form.reset();
  }
  return ok;

  
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('addb');
  const myDiv = document.querySelector('.form');

  toggleButton.addEventListener('click', () => {
	  if (myDiv.style.display === 'none') {
      myDiv.style.display = 'block';
	  } else {
      myDiv.style.display = 'none';
	  }
  });
});

window.onload = function () {
  addBookToLibrary('AAA', 'BBB', 20, true);
  showBook();
};

const form = document.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
console.log(title);

const titleError = title.nextElementSibling;
const authorError = author.nextElementSibling;
const pagesError = pages.nextElementSibling;

console.log(authorError);
// As per the HTML Specification
const textRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Now we can rebuild our validation constraint
// Because we do not rely on CSS pseudo-class, we have to
// explicitly set the valid/invalid class on our email field
window.addEventListener("load", () => {
  // Here, we test if the field is empty (remember, the field is not required)
  // If it is not, we check if its content is a well-formed email address.
  const isTitleValid = title.value.length === 0 || textRegExp.test(title.value);
  title.className = isTitleValid ? "valid" : "invalid";
  const isAuthorValid = author.value.length === 0 || textRegExp.test(author.value);
  author.className = isAuthorValid ? "valid" : "invalid";
});

// This defines what happens when the user types in the field
title.addEventListener("input", () => {
  const isTitleValid = title.value.length === 0 || textRegExp.test(title.value);
  if (isTitleValid) {
    title.className = "valid";
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    title.className = "invalid";
  }
});

author.addEventListener("input", () => {
  console.log('input');
  const isAuthorValid = author.value.length === 0 || textRegExp.test(author.value);
  if (isAuthorValid) {
    author.className = "valid";
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    author.className = "invalid";
  }
});

pages.addEventListener("input", () => {
  console.log('input');
  const isPagesValid = pages.value > 0 ;
  if (isPagesValid) {
    pages.className = "valid";
    pagesError.textContent = "";
    pagesError.className = "error";
  } else {
    pages.className = "invalid";
  }
});


