document.addEventListener("DOMContentLoaded", function () {
  fetch("header.xhtml")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("headerContainer").innerHTML = html;

      // get element
      const information = document.querySelector(".information");

      // lấy data từ local storage
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        information.innerHTML = `<p class="text-nowrap">Hello, <span class="font-bold">${user.username}</span></p>
        <button class="logout w-full bg-[#4c4f69] text-[#eff1f5] px-3 py-1 rounded-md">Logout</button>`;

        const logout = document.querySelector(".logout");

        logout.addEventListener("click", () => {
          localStorage.removeItem("user");
          window.location.href = "/login.xhtml";
        });
      }
    });
});
