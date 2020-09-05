const placeholder = 'https://via.placeholder.com/400x250?text=Placeholder'

let cardsList = [
  {id: 1, title: 'First', price: 10, img: placeholder},
  {id: 2, title: 'Second', price: 20, img: placeholder},
  {id: 3, title: 'Third', price: 30, img: placeholder},
  {id: 4, title: 'Fourth', price: 40, img: placeholder}
]

const toHTML = cardsList => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" src="${cardsList.img}" alt="${cardsList.title}">
      <div class="card-body"> 
          <h5 class="card-title">${cardsList.title}</h5>
          <a href="#" class="btn btn-primary" data-btn="price" data-id="${cardsList.id}">Check price</a>
          <a href="#" class="btn btn-danger" data-btn="remove" data-id="${cardsList.id}">Delete</a>
      </div>
    </div>
  </div>
`

function render() {
  const html = cardsList.map(toHTML).join('')
  document.querySelector('#cardsList').innerHTML = html
}

render()

const priceModal = $.modal({
  title: 'Modal with Price',
  closable: true,
  width: '40wh',
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
        console.log('Close btn Clicked!')
        priceModal.close()
    }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const card = cardsList.find(card => card.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`
      <p><b>${card.title}</b> price is: <strong>${card.price} point(s)</strong></p>  
    `)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `You deleting card: <strong>${card.title}</strong>`
    }).then(() => {
      cardsList = cardsList.filter(card => card.id !== id)
      render()
    }).catch(() => {
      console.log('Catch done!')
    })
  }
})