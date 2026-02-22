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

  const url = "http://localhost:3000/api/search";

  try { 

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const err = await response.text();
      console.log("Server error:", err);
      alert("Server error");
      return;
    }

    const data = await response.json();

   

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const videos = data.results || data.videos || data;

    if (!Array.isArray(videos)) {
      console.log("Available properties:", Object.keys(data));
      alert("Unexpected API format");
      return;
    }

    videos.forEach(video => {

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${video.thumbnail}" alt="thumbnail" />
        <h3>${video.title || "No title"}</h3>
        <p>⏱ ${video.duration || "N/A"}</p>
        <p>👁 ${video.views || "N/A"}</p>
        <a href="${video.video_link}" target="_blank">
          Watch
        </a>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (e) {
    console.error("Error:", e);
    alert("Network error");
  }
}