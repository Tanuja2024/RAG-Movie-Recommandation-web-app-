document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("movie-form");
  const resultDiv = document.getElementById("result");
  const movieRecommendation = document.getElementById("movieRecommendation");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const favoriteMovie = document.getElementById("favoriteMovie").value;
    const type = document.getElementById("type").value;
    const tone = document.getElementById("tone").value;

    const query = `My favorite movie is ${favoriteMovie}. I'm looking for a ${tone}, ${type} movie. What do you recommend?`;

    movieRecommendation.textContent = "⏳ Thinking...";

    try {
      const response = await fetch("http://localhost:3000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok) {
        movieRecommendation.textContent = data.result;
        resultDiv.classList.remove("hidden");
      } else {
        movieRecommendation.textContent = "❌ Failed to get recommendation.";
        console.error(data.error);
      }
    } catch (err) {
      movieRecommendation.textContent = "❌ Failed to get recommendation.";
      console.error(err);
    }
  });
});

