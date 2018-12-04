const cakes = initMenu()

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('tel')) {
  document.getElementById('tel').value = urlParams.get('tel')
}
if (urlParams.get('pu_date')) {
  document.getElementById('pu_date').value = urlParams.get('pu_date')
}
if (urlParams.get('pu_method')) {
  document.getElementById(urlParams.get('pu_method')).checked = true
}

const total = cakes.reduce(
  (acc, { description, nutrition, imagefile, price }) => {
    value = localStorage.getItem(description)
    if (value) {
      let row = document.createElement('tr')
      let name = document.createElement('td')
      name.innerHTML = description
      row.appendChild(name)

      let qtyCell = document.createElement('td')
      qtyCell.innerHTML = value
      row.appendChild(qtyCell)

      let priceCell = document.createElement('td')
      priceCell.innerHTML = price * value
      row.appendChild(priceCell)

      document.getElementById('order_table').appendChild(row)
      return {
        qty: Number(acc.qty) + Number(value),
        total: Number(acc.total) + Number(price) * Number(value)
      }
    }
    return acc
  },
  {
    qty: 0,
    total: 0
  }
)

let row = document.createElement('tr')
let name = document.createElement('td')
name.innerHTML = 'Total'
row.appendChild(name)

let qtyCell = document.createElement('td')
qtyCell.innerHTML = total.qty
row.appendChild(qtyCell)

let priceCell = document.createElement('td')
priceCell.innerHTML = total.total
row.appendChild(priceCell)

document.getElementById('order_table').appendChild(row)

const clearInv = () => {
  localStorage.clear()
  window.location = './index.html'
}

document.getElementById('clear').addEventListener('click', clearInv)
