document.addEventListener("DOMContentLoaded", () => {
  const cartContainer =
    document.querySelector(".cart-items") ||
    document.querySelector(".cart-content");
  const totalDisplay = document.querySelector(".cart-footer p");
  const checkoutBtn = document.querySelector(".checkout-button");

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  function renderCart() {
    cartContainer.innerHTML = "";
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="empty-message" style="text-align:center;padding:20px;width:100%;">Cart is empty</p>`;
      totalDisplay.textContent = `Total : ${formatRupiah(0)}`;
      return;
    }

    cart.forEach((item, idx) => {
      const el = document.createElement("div");
      el.classList.add("cart-item");
      const checked = item.autoChecked ? "checked" : "";

      el.innerHTML = `
        <input type="checkbox" class="cart-checkbox" data-index="${idx}" ${checked}>
        <img src="${item.img || item.image}" alt="${item.name}">
        <div class="details">
          <p class="name">${item.name}</p>
          <p class="price" data-price="${item.price}">${formatRupiah(item.price)}</p>
        </div>
        <div class="quantity">
          <button class="minus">-</button>
          <span>${item.quantity}</span>
          <button class="plus">+</button>
        </div>
        <i class="fa-solid fa-trash" style="cursor:pointer;"></i>
      `;

      el.querySelector(".plus").onclick = () => {
        item.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      };

      el.querySelector(".minus").onclick = () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(idx, 1);
          Swal.fire({
            icon: "success",
            title: "Item dihapus",
            text: `${item.name} telah dihapus dari keranjang`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      };

      el.querySelector(".fa-trash").onclick = () => {
        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        Swal.fire({
          icon: "success",
          title: "Item dihapus",
          text: `${item.name} telah dihapus dari keranjang`,
          timer: 1500,
          showConfirmButton: false,
        });
      };

      el.querySelector(".cart-checkbox").onchange = (e) => {
        item.autoChecked = e.target.checked;
        localStorage.setItem("cart", JSON.stringify(cart));
        calculateTotal();
      };

      cartContainer.appendChild(el);
    });

    calculateTotal();
  }

  function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce(
      (sum, it) => (it.autoChecked ? sum + it.price * it.quantity : sum),
      0,
    );
    totalDisplay.textContent = `Total : ${formatRupiah(total)}`;
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const checked = cart.filter((it) => it.autoChecked);

      if (checked.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Pilih Item!",
          text: "Silakan centang setidaknya satu produk sebelum checkout.",
        });
        return;
      }

      localStorage.setItem("checkout_items", JSON.stringify(checked));
      Swal.fire({
        icon: "success",
        title: "Checkout berhasil!",
        text: "Anda akan diarahkan ke halaman pembayaran.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        location.href = "pembayaran.html";
      });
    });
  }

  renderCart();
});
