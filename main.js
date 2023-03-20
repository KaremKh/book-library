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

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  form.reset();

  console.log(title, author, pages, read);
  addBookToLibrary(title, author, pages, read);
  showBook();
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
