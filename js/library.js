const MAIN = document.querySelector('main')
const FORM_ELEM = document.querySelector('#form-new-book')
const FORM_BTN = FORM_ELEM.querySelector('button')

let collection = [
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
  let readStatus = collection[i].read

  card.innerHTML = `
  <div class="book"></div>
  <div class="info">
  <div class="details">
  <header>  
  <h3 class="title">${collection[i].title}</h3>
  <h4 class="author">${collection[i].author}</h4>
  </header>
  <p class="pages">${collection[i].pages} pages</p>
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
  collection.push(book)
}

const displayLibrary = () => {
  let library = document.createElement('div')
  library.id = 'library'
  MAIN.appendChild(library)
  for (let i = 0; i < collection.length; i++){
    library.appendChild(createCard(i))
  }
}

const removeLibrary = () => {
  document.querySelector('#library').remove()
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}
  
// Instantiate

displayLibrary()

// Event Listeners

FORM_BTN.addEventListener('click', () => {
  let formData = new FormData(FORM_ELEM)
  let bookInfo = formData.getAll('bookInfo')
  
  addBookToLibrary(new Book(...bookInfo))
  removeLibrary()
  displayLibrary()
})
