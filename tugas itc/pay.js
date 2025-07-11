document.addEventListener("DOMContentLoaded", () => {
  const summaryContainer = document.getElementById("summary");
  const totalDisplay = summaryContainer.querySelector(".total");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  let content = "";

  function formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(num);
  }

  cart.forEach(item => {
    // hanya tampilkan item yang dicentang (dari tombol Buy Now)
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

  // inject item ke dalam summary
  if (content === "") {
    summaryContainer.insertAdjacentHTML("afterbegin", `<p style="text-align:center;color:gray;">Tidak ada item yang dipilih</p>`);
  } else {
    totalDisplay.insertAdjacentHTML("beforebegin", content);
  }

  // update totalnya
  totalDisplay.textContent = `Total: ${formatRupiah(total)}`;
});
