let cart = [];

function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  renderCart();
}

function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);
  renderCart();
}

function increaseQty(name) {
  const item = cart.find((i) => i.name === name);
  item.qty++;
  renderCart();
}

function decreaseQty(name) {
  const item = cart.find((i) => i.name === name);
  if (item.qty > 1) {
    item.qty--;
  } else {
    removeItem(name);
    return;
  }
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  const cartBody = document.getElementById("cart-body");
  const cartTotal = document.getElementById("cart-total");

  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    cartBody.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger" onclick="decreaseQty('${item.name}')">-</button>
            <span class="mx-2">${item.qty}</span>
            <button class="btn btn-sm btn-outline-success" onclick="increaseQty('${item.name}')">+</button>
          </td>
          <td>$${subtotal}</td>
          <td>
            <button class="btn btn-sm btn-dark" onclick="removeItem('${item.name}')">Eliminar</button>
          </td>
        </tr>
      `;
  });

  cartTotal.textContent = total;
}
