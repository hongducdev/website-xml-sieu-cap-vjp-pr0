// select the form
const form = document.querySelector("form");

const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  window.location.href = "/index.xhtml";
}

// add event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const username = formData.get("username");
  const password = formData.get("password");

  const news = {
    username,
    password,
  };

  fetch("http://localhost:4090/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(news),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        form.reset();
        alert("Login successfully");
        // lưu data vào local storage
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/index.xhtml";
      }
    })
    .catch((error) => {
      //   console.error("Error:", error);
      form.reset();
      alert("Login fail");
      window.location.href = "/login.xhtml";
    });
});
