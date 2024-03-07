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
  const name = formData.get("name");
  const address = formData.get("address");
  const email = formData.get("email");

  const news = {
    username,
    password,
    name,
    address,
    email,
  };

  fetch("http://localhost:4090/auth/register", {
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
        alert("Sign in successfully");
        window.location.href = "/login.xhtml";
      }
    })
    .catch((error) => {
      //   console.error("Error:", error);
      form.reset();
      alert("Sign in fail");
      window.location.href = "/signUp.xhtml";
    });
});
