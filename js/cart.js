const cartIcon = document.getElementById('cartIcon');
const cartPaper = document.getElementById('cartPaper');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const cartBadge = document.getElementById('cartBadge');

let cart = JSON.parse(localStorage.getItem('lc_cart') || '[]');

function saveCart() {
  localStorage.setItem('lc_cart', JSON.stringify(cart));
}

function renderCart() {
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  
  let totalKg = 0;
  let totalPrice = 0;

  if (cart.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.className = 'cart-empty';
    emptyMsg.textContent = 'Your cart is empty';
    cartList.appendChild(emptyMsg);
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      
      const itemTotal = item.kg * 2500;
      totalKg += item.kg;
      totalPrice += itemTotal;

      const header = document.createElement('div');
      header.className = 'cart-item-header';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'cart-item-name';
      nameSpan.textContent = item.name;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'cart-remove-btn';
      removeBtn.setAttribute('aria-label', 'Remove item');
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromCart(index);
      });

      header.appendChild(nameSpan);
      header.appendChild(removeBtn);

      const controls = document.createElement('div');
      controls.className = 'cart-item-controls';

      const qtyGroup = document.createElement('div');
      qtyGroup.className = 'cart-quantity-group';

      const minusBtn = document.createElement('button');
      minusBtn.className = 'cart-qty-btn minus';
      minusBtn.setAttribute('aria-label', 'Decrease quantity');
      minusBtn.textContent = '−';
      minusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateQuantity(index, -0.1);
      });

      const qtyValue = document.createElement('span');
      qtyValue.className = 'cart-qty-value';
      qtyValue.textContent = item.kg.toFixed(1) + ' kg';

      const plusBtn = document.createElement('button');
      plusBtn.className = 'cart-qty-btn plus';
      plusBtn.setAttribute('aria-label', 'Increase quantity');
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateQuantity(index, 0.1);
      });

      qtyGroup.appendChild(minusBtn);
      qtyGroup.appendChild(qtyValue);
      qtyGroup.appendChild(plusBtn);

      const priceSpan = document.createElement('span');
      priceSpan.className = 'cart-item-price';
      priceSpan.textContent = 'ETB ' + itemTotal.toFixed(0);

      controls.appendChild(qtyGroup);
      controls.appendChild(priceSpan);

      li.appendChild(header);
      li.appendChild(controls);
      cartList.appendChild(li);
    });

    const clearLi = document.createElement('li');
    clearLi.className = 'cart-clear-row';

    const clearBtn = document.createElement('button');
    clearBtn.className = 'cart-clear-btn';
    clearBtn.textContent = 'Clear Cart';
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearCart();
    });

    clearLi.appendChild(clearBtn);
    cartList.appendChild(clearLi);
  }

  cartTotal.textContent = totalKg.toFixed(1) + ' kg – ETB ' + totalPrice.toFixed(0);
  cartBadge.textContent = cart.length;
}

cartIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  cartPaper.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!cartIcon.contains(e.target) && !cartPaper.contains(e.target)) {
    cartPaper.classList.remove('show');
  }
});

function updateQuantity(index, change) {
  cart[index].kg += change;
  cart[index].kg = Math.round(cart[index].kg * 10) / 10;
  
  if (cart[index].kg <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function clearCart() {
  if (confirm('Are you sure you want to remove all items from your cart?')) {
    cart = [];
    saveCart();
    renderCart();
  }
}

function addToCart(name, kg) {
  const exist = cart.find(i => i.name === name);
  if (exist) {
    exist.kg += kg;
    exist.kg = Math.round(exist.kg * 10) / 10;
  } else {
    cart.push({ name, kg });
  }
  saveCart();
  renderCart();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = 'Added ' + kg + ' kg of ' + name;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
  
  cartPaper.classList.add('show');
}

renderCart();