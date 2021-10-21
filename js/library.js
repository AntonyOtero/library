const LIBRARY = document.querySelector('#library')
const FORM_ELEM = document.querySelector('#form-new-book')
const FORM_BTN = FORM_ELEM.querySelector('button')
let formData

let myLibrary = [
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    pages: '141',
    read: true
  },
  {
    title: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    pages: '419',
    read: true
  },
  {
    title: 'A Court of Mist and Fury',
    author: 'Sarah J. Maas',
    pages: '626',
    read: false
  },
  {
    title: 'Milk and Honey',
    author: 'Rupi Kaur',
    pages: '204',
    read: true
  }
]

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

const createCard = (i) => {
  let card = document.createElement('div')
  let readStatus = myLibrary[i].read

  card.innerHTML = `
  <div class="book"></div>
  <div class="info">
  <div class="details">
  <header>  
  <h3 class="title">${myLibrary[i].title}</h3>
  <h4 class="author">${myLibrary[i].author}</h4>
  </header>
  <p class="pages">${myLibrary[i].pages} pages</p>
  </div>
  <div class="read">${
    (readStatus) ? "Finished" : "Not Finished"
  }</div>
  </div>`
  
  if (readStatus) {
    card.classList.add('finished')
  }
  card.classList.add('card')

  return card
}

const addBookToLibrary = (book) => {
  myLibrary.push(book)
}

// TODO Delete all elements inside #library before displaying books
const displayLibrary = () => {
  for (let i = 0; i < myLibrary.length; i++){
    LIBRARY.appendChild(createCard(i))
  }
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
  }

const animalFarm = new Book('Animal Farm', 'George Orwell', '141', true)


displayLibrary()

// Event Listeners

FORM_BTN.addEventListener('click', () => {
  formData = new FormData(FORM_ELEM)
  let bookInfo = formData.getAll('bookInfo')
  
  addBookToLibrary(new Book(...bookInfo))
  displayLibrary()
})