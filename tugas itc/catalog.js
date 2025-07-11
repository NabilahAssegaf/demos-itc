document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach((button) => {
    const textPart = button.querySelector(".text"); 
    const iconPart = button.querySelector(".icon"); 


    textPart.addEventListener("click", () => {
      const item = button.closest(".category");
      const name = item.querySelector(".name").textContent;
      const price = parseInt(
        item.querySelector(".price").textContent.replace(/[^0-9]/g, ""),
        10,
      );
      const image = item.querySelector("img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existed = cart.find((i) => i.name === name);

      if (existed) {
        existed.quantity += 1;
        existed.autoChecked = true;
      } else {
        cart.push({ name, price, quantity: 1, img: image, autoChecked: true });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "cart.html";
    });


    iconPart.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const item = button.closest(".category");
      const name = item.querySelector(".name").textContent;
      const price = parseInt(
        item.querySelector(".price").textContent.replace(/[^0-9]/g, ""),
        10,
      );
      const image = item.querySelector("img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existed = cart.find((i) => i.name === name);

      if (existed) {
        existed.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1, img: image });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      Swal.fire({
        icon: "success",
        title: "Ditambahkan!",
        text: `${name} berhasil dimasukkan ke keranjang.`,
        timer: 1500,
        showConfirmButton: false,
      });
    });
  });
});
