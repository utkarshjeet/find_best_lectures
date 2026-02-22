document.getElementById("searchButton")
  .addEventListener("click", fetchVideo);

async function fetchVideo() {

  const query = document
    .getElementById("searchInput")
    .value
    .trim();

  if (query === "") {
    alert("Enter search term");
    return;
  }

  const url = "https://porn-xnxx-api.p.rapidapi.com/search";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "",
      "x-rapidapi-host": "porn-xnxx-api.p.rapidapi.com",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      q: query
    })
  };

  try {

    const response = await fetch(url, options);

    if (!response.ok) {
      const err = await response.text();
      console.log("Server error:", err);
      return;
    }

    const data = await response.json();

    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "";

    console.log("Full API response:", data);

    const videos = data.results || data.videos || data;
    
    if (!Array.isArray(videos)) {
      console.log("Available properties:", Object.keys(data));
      alert("Could not find videos in response. Check console for details.");
      return;
    }

    videos.forEach(video => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${video.thumbnail}" />
        <h3>${video.title}</h3>
        <p>⏱ ${video.duration}</p>
        <p>👁 ${video.views}</p>
        <a href="${video.video_link}" target="_blank">
          Watch
        </a>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (e) {
    console.error("Error:", e);
  }
}