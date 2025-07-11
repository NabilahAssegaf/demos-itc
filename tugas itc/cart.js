document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items") || document.querySelector(".cart-content");
  const totalDisplay = document.querySelector(".cart-footer p");

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  }

  function renderCart() {
    cartContainer.innerHTML = "";
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="empty-message" style="text-align:center; padding:20px; width:100%;">Cart is empty</p>`;
      totalDisplay.textContent = `Total : ${formatRupiah(0)}`;
      return;
    }

    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      const isChecked = item.autoChecked ? 'checked' : '';

      itemElement.innerHTML = `
        <input type="checkbox" class="cart-checkbox" data-index="${index}" ${isChecked}>
        <img src="${item.img || item.image}" alt="${item.name}">
        <div class="details">
          <p class="name">${item.name}</p>
          <p class="price">${formatRupiah(item.price)}</p>
        </div>
        <div class="quantity">
          <button class="minus">-</button>
          <span>${item.quantity}</span>
          <button class="plus">+</button>
        </div>
        <i class="fa-solid fa-trash" style="cursor:pointer;"></i>
      `;

      itemElement.querySelector(".plus").addEventListener("click", () => {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      itemElement.querySelector(".minus").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      itemElement.querySelector(".fa-trash").addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      cartContainer.appendChild(itemElement);
    });

    calculateTotal();
  }

  function calculateTotal() {
    const checkboxes = document.querySelectorAll(".cart-checkbox");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    checkboxes.forEach((cb, index) => {
      if (cb.checked) {
        total += cart[index].price * cart[index].quantity;
      }
    });

    totalDisplay.textContent = `Total : ${formatRupiah(total)}`;
  }

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("cart-checkbox")) {
      calculateTotal();
    }
  });

  renderCart();
});