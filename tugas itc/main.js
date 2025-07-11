document
  .getElementById("testimonial-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const rating = document.querySelector(
      'input[name="rating"]:checked',
    )?.value;

    if (!name || !message || !rating) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Nama, pesan, dan rating wajib diisi!",
      });
      return;
    }

    const stars = "★".repeat(rating);
    const card = document.createElement("div");
    card.classList.add("testimonial-card", "fade-in");
    card.innerHTML = `
    <div class="user-info">
      <img src="img/user.jpg" alt="User" class="profile-pic" />
      <div>
        <p class="user-name">${name}</p>
        <p class="date">${new Date().toLocaleDateString("id-ID")}</p>
      </div>
    </div>
    <p class="comment">${message}</p>
    <p class="stars">${stars}</p>
  `;

    document.getElementById("testimonial-list").prepend(card);
    document.getElementById("testimonial-form").reset();

    Swal.fire({
      icon: "success",
      title: "Terima kasih!",
      text: "Komentar Anda berhasil ditambahkan!",
      timer: 2000,
      showConfirmButton: false,
    });
  });

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Nama, email, dan pesan harus diisi!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Pesan Terkirim!",
      text: "Terima kasih, kami akan segera merespon pesanmu!",
      timer: 2000,
      showConfirmButton: false,
    });

    // Reset form
    document.querySelector(".contact-form").reset();
  });
