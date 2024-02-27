// get api
// http://localhost:4090/books

// selected elements
const firstNews = document.querySelector(".first-news");
const newsContainer = document.querySelector(".news-container");

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

const api = "http://localhost:4090/news";
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
    console.log(data);
    if (data.error) {
      isError = true;
    }

    return data;
  } catch (error) {
  } finally {
    isLoading = false;
  }
};

getNews()
  .then((data) => {
    if (data && data[0]) {
      firstNews.innerHTML = `
      <img src="${
        data[0].image
      }" alt="" class="h-[300px] w-full object-cover rounded-xl bg-center bg-cover shadow-lg" />
      <div class="">
        <span class="mb-3 text-sm text-[#6c6f85]">
          <span class="mr-2">${convertTime(data[0].createdAt)}</span>
          <span class="mr-2">•</span>
          <span class="mr-2">By ${data[0].author}</span>
        </span>
        <a href="/newsDetail.xhtml?id=${data[0].id}" class="">
          <h2 class="font-bold text-5xl hover:text-[#40a02b] transition-all duration-300 ease-in-out">${
            data[0].title
          }</h2>
        </a>
        <p class="mt-4 line-clamp-2">${data[0].content}</p>
        <span class="">
          <a href="/newsDetail.xhtml?id=${
            data[0].id
          }" class="text-[#40a02b] hover:underline"> Read more </a>
        </span>
      </div>
    `;

      // hiển thị các tin tức còn lại
      data.slice(1).forEach((news) => {
        newsContainer.innerHTML += `
        <div class="bg-[#e6e9ef] p-1 rounded-lg">
          <img
            src="${news.image}"
            alt=""
            class="h-[200px] w-full object-cover rounded-xl bg-center bg-cover shadow-lg"
          />
          <div class="p-5">
            <span class="text-sm text-[#6c6f85]">
              <span class="mr-2">${convertTime(news.createdAt)}</span>
              <span class="mr-2">•</span>
              <span class="mr-2">By ${news.author}</span>
            </span>
            <a href="/newsDetail.xhtml?id=${news.id}" class="">
              <h2
                class="font-bold text-2xl hover:text-[#40a02b] transition-all duration-300 ease-in-out"
              >
                ${news.title}
              </h2>
            </a>
            <p class="mt-2 line-clamp-2">
              ${news.content}
            </p>
            <span class="">
              <a href="/newsDetail.xhtml?id=${
                news.id
              }" class="text-[#40a02b] hover:underline"> Read more </a>
            </span>
          </div>
        </div>
      `;
      });
    } else {
      console.error("Data is invalid or empty.");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
