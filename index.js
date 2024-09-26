const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};



function renderGroceries(){
  const storeList = document.querySelector('.store--item-list')
  storeList.innerHTML= ''

  state.items.forEach((item) =>{
    const itemElement = document.createElement('li')
    itemElement.innerHTML = `
            <div class="store--item-icon">
                <img src="assets/icons/${item.id}.svg" alt="${item.name}">
            </div>
            <button onclick="addToCart('${item.id}')">Add to cart</button>
        `
    storeList.appendChild(itemElement)
  })

}




function renderCart() {
  const cartList = document.querySelector('.cart--item-list');
  cartList.innerHTML = ''; 

  state.cart.forEach(cartItem => {
    const cartItemElement = document.createElement('li');
    cartItemElement.innerHTML = `
      <img class="cart--item-icon" src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}">
      <p>${cartItem.name}</p>
      <button class="quantity-btn remove-btn" onclick="decreaseQuantity('${cartItem.id}')">-</button>
      <span class="quantity-text">${cartItem.quantity}</span>
      <button class="quantity-btn add-btn" onclick="increaseQuantity('${cartItem.id}')">+</button>
    `;
    cartList.appendChild(cartItemElement);
  });
}


function addToCart(itemId) {
  const cartItem = state.cart.find(item => item.id === itemId);
  
  if (cartItem) {
    cartItem.quantity++;
  } else {
    const itemToAdd = state.items.find(item => item.id === itemId);
    state.cart.push({
      ...itemToAdd,
      quantity: 1
    });
  }

  renderCart();
  updateTotal();
}

function increaseQuantity(itemId) {
  const cartItem = state.cart.find(item => item.id === itemId);
  if (cartItem) {
    cartItem.quantity++;
    renderCart();
    updateTotal();
  }
}

function decreaseQuantity(itemId) {
  const cartItem = state.cart.find(item => item.id === itemId);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--;
  } else {
    state.cart = state.cart.filter(item => item.id !== itemId);
  }
  renderCart();
  updateTotal();
}

function updateTotal() {
  const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDisplay = document.querySelector('.total-number');
  totalDisplay.textContent = `£${total.toFixed(2)}`;
}

renderGroceries()
renderCart()
