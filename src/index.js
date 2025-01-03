// index.js
const ramenMenu = document.getElementById('ramen-menu')
const ramenDetail = document.getElementById('ramen-detail')
const detailImage = document.getElementById('detail-image') 
const detailName = document.getElementById('detail-name')
const detailRestaurant = document.getElementById('detail-restaurant')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')
const ramenForm = document.getElementById('new-ramen')
const formName = document.getElementById('new-name')
const formRestaurant = document.getElementById('new-restaurant')
const formImage = document.getElementById('new-image')
const formRating = document.getElementById('new-rating')
const formComment = document.getElementById('new-comment')
let ramenCounter = 0;

class Ramen {
  constructor(id, name, restaurant, image, rating, comment) {
    this.id = id
    this.name = name
    this.restaurant = restaurant
    this.image = image
    this.rating = rating
    this.comment = comment
  }
  createDisplay() {
    const img = document.createElement('img')
    img.src = this.image
    img.addEventListener('click', handleClick.bind(this))
    ramenMenu.append(img)
  }
}

// Callbacks
function handleClick() {
  detailImage.src = this.image
  detailName.textContent = this.name
  detailRestaurant.textContent = this.restaurant
  ratingDisplay.textContent = this.rating
  commentDisplay.textContent = this.comment
}

const addSubmitListener = () => {
  ramenForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const newRamen = new Ramen((ramenCounter + 1), formName.value, formRestaurant.value, formImage.value, formRating.value, formComment.value)
    newRamen.createDisplay()
  })
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => data.forEach(ramen => {
      const newRamen = new Ramen(ramen.id, ramen.name, ramen.restaurant, ramen.image, ramen.rating, ramen.comment)
      newRamen.createDisplay()
      ramenCounter++
    }))
}

const main = () => {
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
