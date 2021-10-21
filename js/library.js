const MAIN = document.querySelector('main')
const FORM_ELEM = document.querySelector('#form-new-book')
const FORM_BTN = FORM_ELEM.querySelector('button')

let collection = [
  new Book('Animal Farm', 'George Orwell', '141', true),
  new Book('A Court of Thorns and Roses', 'Sara J. Maas', '419', true),
  new Book('A Court of Mist and Fury', 'Sara J. Maas', '626', false),
  new Book('Milk and Honey', 'Rupi Kaur', '204', true)
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
  <div class="photo"></div>
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
  </div>
  <div class="remove" data-id=${i}>
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-minus" class="svg-inline--fa fa-circle-minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280h-192C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24h192C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"></path></svg>
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

const updateLibrary = () => {
  let library = document.createElement('div')
  library.id = 'library'
  
  MAIN.appendChild(library)
  for (let i = 0; i < collection.length; i++){
    library.appendChild(createCard(i))
  }

  let removeButtons = document.querySelectorAll('.remove')
  let readButtons = document.querySelectorAll('.read')


  removeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      collection.splice(btn.dataset.id, 1)
      deleteLibrary()
      updateLibrary()
      console.log(collection)
    })
  })

  readButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      console.log(collection[i])
      collection[i].toggleRead()
      console.log(collection[i])
      deleteLibrary()
      updateLibrary()
    })
  })
}

const deleteLibrary = () => {
  document.querySelector('#library').remove()
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

Book.prototype.toggleRead = function () {
  return this.read = !this.read
}

updateLibrary()

FORM_BTN.addEventListener('click', () => {
  let formData = new FormData(FORM_ELEM)
  let bookInfo = formData.getAll('bookInfo')
  
  addBookToLibrary(new Book(...bookInfo))
  deleteLibrary()
  updateLibrary()
})
