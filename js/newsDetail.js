const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// covert time
const convertTime = (time) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};

// selected elements
const image = document.querySelector(".image");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const createdAt = document.querySelector(".time");
const content = document.querySelector(".content");
const updateLink = document.getElementById("updateLink");
const ellipsisButton = document.getElementById("ellipsisButton");
const optionsContainer = document.getElementById("optionsContainer");

// get api
// http://localhost:4090/news/:id

// truyền id vào vào form
updateLink.href = `/update.xhtml?id=${id}`;

const api = `http://localhost:4090/news/${id}`;

ellipsisButton.addEventListener("click", () => {
  optionsContainer.classList.toggle("hidden");
});

const getNews = async () => {
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data) {
      image.src = data.image;
      title.textContent = data.title;
      author.textContent = `By ${data.author}`;
      createdAt.textContent = convertTime(data.createdAt);
      content.textContent = data.content;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

getNews();

const deleteForm = document.getElementById("deleteForm");

deleteForm.addEventListener("submit", function (event) {

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You need to login to delete news");
    window.location.href = "/login.xhtml";
    return;
  }

  event.preventDefault();
  if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    fetch(`http://localhost:4090/news/delete/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("News delete successfully");
        window.location.href = "/index.xhtml";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
