const cakes = initMenu()

updateOrderNo = () => {
  document.getElementById('order_no').value = document.getElementById(
    'tel'
  ).value
}

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('tel')) {
  document.getElementById('tel').value = urlParams.get('tel')
  updateOrderNo()
}
if (urlParams.get('pu_date')) {
  document.getElementById('pu_date').value = urlParams.get('pu_date')
}
if (urlParams.get('pu_method')) {
  document.getElementById(urlParams.get('pu_method')).checked = true
}

orderCake = e => {
  const cake = e.srcElement.title
  let qty = 0
  do {
    qty = prompt('Enter the quantity you like to Order')
  } while (qty === 0)
  if (qty) {
    let row = document.createElement('tr')
    let name = document.createElement('td')
    let label = document.createElement('label')
    label.for = cake
    label.innerHTML = cake
    name.appendChild(label)
    row.appendChild(name)

    let qtyCell = document.createElement('td')
    let input = document.createElement('input')
    input.type = 'number'
    input.id = cake
    input.name = cake
    input.value = qty
    input.disabled = true
    qtyCell.appendChild(input)
    row.appendChild(qtyCell)

    document.getElementById('order_table').appendChild(row)
    let total = document.getElementById('total').value
    document.getElementById('total').value = Number(total) + Number(qty)

    localStorage.setItem(cake, qty)
  }
}

cakes.forEach(({ description, imagefile }) => {
  let item = document.createElement('div')
  item.classList.add('item')
  let image = document.createElement('img')
  image.src = `./images/${imagefile}`
  image.alt = description
  image.title = description
  image.onclick = orderCake
  item.appendChild(image)
  document.getElementById('cake_grid').appendChild(item)
})

checkForm = () => {
  let form = document.forms['order_form']
  if (
    !form['tel'].value ||
    !form['pu_date'].value ||
    !form['pu_method'].value
  ) {
    document.getElementById('error').classList.add('show')
    return false
  }
}

removeError = () => {
  document.getElementById('error').classList.remove('show')
}
