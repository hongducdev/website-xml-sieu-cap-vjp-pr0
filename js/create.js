// select the form
const form = document.querySelector("form");

// add event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const id = formData.get("id");
  const title = formData.get("title");
  const author = formData.get("author");
  const createdAt = formData.get("createdAt");
  const image = formData.get("image");
  const content = formData.get("content");

  const news = {
    id,
    title,
    author,
    createdAt,
    image,
    content,
  };

  fetch("http://localhost:4090/news", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(news),
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.error) {
        alert(data.error);
      } else {
        form.reset();
        alert("News created successfully");
        window.location.href = "/index.xhtml";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
