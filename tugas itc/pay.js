document.addEventListener("DOMContentLoaded", () => {
  const summaryContainer = document.getElementById("summary");
  const totalDisplay = summaryContainer.querySelector(".total");
  const payButton = summaryContainer.querySelector(".pay-btn");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  let content = "";

  function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  }

  cart.forEach((item) => {
    if (item.autoChecked) {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      content += `
        <div class="order-item">
          <span>${item.name} (x${item.quantity})</span>
          <span>${formatRupiah(subtotal)}</span>
        </div>
      `;
    }
  });

  if (content === "") {
    summaryContainer.insertAdjacentHTML(
      "afterbegin",
      `<p style="text-align:center;color:gray;">Tidak ada item yang dipilih</p>`,
    );
    payButton.disabled = true;
    payButton.style.opacity = 0.5;
    payButton.style.cursor = "not-allowed";
  } else {
    totalDisplay.insertAdjacentHTML("beforebegin", content);
    totalDisplay.textContent = `Total: ${formatRupiah(total)}`;
  }

  payButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !phone || !address || !payment) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Semua data pengiriman harus diisi!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Pembayaran Berhasil!",
      text: "Pesanan Anda telah diterima. Terima kasih!",
    }).then(() => {
      // bersihkan localStorage
      const remaining = cart.filter((item) => !item.autoChecked);
      localStorage.setItem("cart", JSON.stringify(remaining));
      window.location.href = "index.html";
    });
  });
});
