const amountInput = document.querySelector('[name="offer[amount]"]')
const newPrice = document.querySelector('#new_price')

price = parseInt(price)

amountInput.addEventListener("change", (e) => {
    newPrice.textContent = `${parseFloat(price * (parseInt(amountInput.value)/100)).toFixed(2)}${currency}`;
})