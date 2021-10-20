function Player (title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${pages} pages, ${read}`
  }
}

const animalFarm = new Player('Animal Farm', 'George Orwell', '141', true)

console.log(animalFarm.info())