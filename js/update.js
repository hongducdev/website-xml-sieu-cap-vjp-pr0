// get api
// http://localhost:4090/:id

// selected elements
const firstNews = document.querySelector(".first-news");
const newsContainer = document.querySelector(".news-container");
// const idNews = document.querySelector(".id-news");
const titleNews = document.querySelector("#title");
const authorNews = document.querySelector("#author");
const timeCreateNews = document.querySelector("#createdAt");
const imgNews = document.querySelector("#image");
const contentNews = document.querySelector("#content");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
  // select the form
  const form = document.querySelector("form");  

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

  const api = `http://localhost:4090/news/${id}`;
  let isLoading = false;
  let isError = false;

  const getNews = async () => {
    isLoading = true;
  
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      // console.log(data);
      if (data) {
        // image.src = data.image;
        // title.textContent = data.title;
        // author.textContent = `By ${data.author}`;
        // createdAt.textContent = convertTime(data.createdAt);
        // content.textContent = data.content;
        imgNews.value = data.image;
        titleNews.value = data.title;
        authorNews.value = data.author;
        console.log(timeCreateNews)
        timeCreateNews.value = data.createdAt;
        contentNews.value = data.content;
      }
  
      
    } catch (error) {
        console.error("Error:", error);
    } finally {
      isLoading = false;
    }
  };

  getNews();




//add event listener to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // const formData = new FormData(form);


  const news = {
    id,
    title: titleNews.value,
    author: authorNews.value,
    createdAt : timeCreateNews.value,
    image: imgNews.value,
    content: contentNews.value,
  };

  fetch(`http://localhost:4090/news/update/${id}`, {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(news),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      form.reset();
      alert("News created successfully");
      window.location.href = "/index.xhtml";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

