const Book = (title, author, pages, isRead) => {
  const info = () => {
    return `${title} by ${author}, ${pages} pages, ${isRead}`
  }

  const toggleIsRead = () => {
    isRead = !isRead
  }

  return {title, author, pages, isRead, info, toggleIsRead}
}

const registry = (() => {
  const collection = [
    Book('Animal Farm', 'George Orwell', '141', true),
    Book('A Court of Thorns and Roses', 'Sara J. Maas', '419', true),
    Book('A Court of Mist and Fury', 'Sara J. Maas', '626', false),
    Book('Milk and Honey', 'Rupi Kaur', '204', true)
  ]

  const addToCollection = (book) => {
    collection.push(book)
  }

  return {collection, addToCollection}
})()

const library = (() => {
  const main_element = document.querySelector("main")
  const library_component = document.querySelector(".library")
  const form_component = document.querySelector(".new-book-form")
  const open_form_button = form_component.querySelector("button")
  const new_book_button = document.querySelector("#new-book")
  const remove_Buttons = document.querySelectorAll(".remove")
  const read_Buttons = document.querySelectorAll(".read")

  const newCard = (title, author, pages, isRead) => {
    let card = document.createElement('div.card')

    card.innerHTML = `
    <div class="photo"></div>
    <div class="info">
    <div class="details">
    <header>  
    <h3 class="title">${title}</h3>
    <h4 class="author">${author}</h4>
    </header>
    <p class="pages">${pages} pages</p>
    </div>
    <div class="read">${
      (isRead) ? "Finished" : "Not Finished"
    }</div>
    </div>
    <div class="remove" data-id=${registry.collection.length - 1}>
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-minus" class="svg-inline--fa fa-circle-minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280h-192C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24h192C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"></path></svg>
    </div>`
    
    if (isRead) {
      card.classList.add('finished')
    }

    return card
  }

  const addDisplay = () => {
    const library = document.createElement('div.library')
    main_element.append(library)
  }

  const removeDisplay = () => {
    document.querySelector('.library').remove()
  }

  const updateDisplay = () => {
    if (document.querySelector(".library")) {
      removeDisplay()
    }
    addDisplay()

    registry.collection.forEach(book => {
      library_component.append(newCard(
        book.title,
        book.author,
        book.pages,
        book.isRead
      ))
    })
  }

  updateDisplay()

  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      registry.collection.splice(btn.dataset.id, 1)
      updateLibrary()
    })
  })

  readButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      registry.collection[i].toggleIsRead()
      updateLibrary()
    })
  })

  new_book_button.addEventListener("click", () => {
    form_component.classList.toggle('opened')
    let content = (form_component.classList.contains("opened")) ?
      "Close" : "New Book"
    new_book_button.innerText = content
  })

  open_form_button.addEventListener("click", () => {
    let formData = new FormData(form_component)
    let bookInfo = formData.getAll('bookInfo')
    
    registry.addToCollection(Book(...bookInfo))
    updateLibrary()
  })

  return {}
})()
