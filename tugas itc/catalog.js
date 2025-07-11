document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(button => {
    const textPart = button.querySelector(".text");
    const iconPart = button.querySelector(".icon");

    // 🟡 Klik teks "Buy Now" → masuk ke cart + pindah ke halaman cart
    textPart.addEventListener("click", () => {
      const item = button.closest(".category");
      const name = item.querySelector(".name").textContent;
      const priceText = item.querySelector(".price").textContent.replace(/[^0-9]/g, "");
      const price = parseInt(priceText);
      const image = item.querySelector("img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(i => i.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.autoChecked = true;
      } else {
        cart.push({ name, price, quantity: 1, img: image, autoChecked: true });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html";
    });

    // 🟢 Klik ikon keranjang → masuk ke cart + tampil alert
    iconPart.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      const item = button.closest(".category");
      const name = item.querySelector(".name").textContent;
      const priceText = item.querySelector(".price").textContent.replace(/[^0-9]/g, "");
      const price = parseInt(priceText);
      const image = item.querySelector("img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(i => i.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1, img: image });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} berhasil ditambahkan ke keranjang!`);
    });
  });
});
