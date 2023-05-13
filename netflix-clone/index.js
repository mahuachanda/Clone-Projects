const apiKey = "aa6380cae03defa1763eb7661a92f06b"; //generated API key after login to tmdb
const youtubeapikey = "AIzaSyBrmHmfL5ibe928K6SQ-NQJJ_mz01o_bb0";
const apiEndpoint = "https://api.themoviedb.org/3"; //define the domain
const imagePath = "https://image.tmdb.org/t/p/original";
const time_window = "week";
const apiPath = {
  fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apiKey}`,
  fetchAllMovieLists: (id) =>
    `${apiEndpoint}/discover/movie/?api_key=${apiKey}&with_genres=${id}`,
  fetchTrendingMovieList: `${apiEndpoint}/trending/movie/${time_window}?api_key=${apiKey}`,
  searchOnYoutube: (query) =>
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${youtubeapikey}`,
};

//api.themoviedb.org/3/discover/movie?api_key=7543524441a260664a97044b8e2dc621&with_genres=28
function init() {
  fetchTrendingMovies();
  fetchAndBuilAlldSection();
}

function fetchTrendingMovies() {
  fetchandbuildMovieSection(apiPath.fetchTrendingMovieList, "Trending Now")
    .then((list) => {
      const randomIndex = parseInt(Math.random() * list.length);
      buildBannerSection(list[randomIndex]);
    })
    .catch((err) => console.log(err));
}

function buildBannerSection(movie) {
  const bannerSection = document.getElementById("banner-section");
  console.log("movie:" + movie);
  bannerSection.style.backgroundImage = `url(${imagePath}${movie.backdrop_path})`;

  const bannerContentDiv = document.createElement("div");
  bannerContentDiv.innerHTML = `
  <div class="banner_info_section">  
    <h2 class="banner_title">${movie.title}</h2>
    <p class="banner_info">Trending in movies | Released on ${
      movie.release_date
    }</p>
     <p class="banner_overview">${
       movie.overview && movie.overview.length > 150
         ? movie.overview.slice(0, 150).trim() + " ..."
         : movie.overview
     }</p>
  </div>
  <div class="banner_action_buttons">
     <button class="banner_action_button"><img src="assests/play.svg" alt="play button"><span>Play</span></button>
     <button class="banner_action_button"><img src="assests/info.svg" alt="play button"><span>More info</span></button>
  </div>`;

  bannerContentDiv.className = "banner-content container";
  bannerSection.append(bannerContentDiv);
}

function fetchAndBuilAlldSection() {
  fetch(apiPath.fetchAllCategories).then((res) =>
    res
      .json()
      .then((res) => {
        const categories = res.genres;
        //console.table(categories);
        if (Array.isArray(categories) && categories.length) {
          categories.slice(0, 6).forEach((category) => {
            fetchandbuildMovieSection(
              apiPath.fetchAllMovieLists(category.id),
              category.name
            );
          });
        }
      }) /** it is readable format (json()) check the response in the browser console*/
      .catch((err) => console.error(err))
  );
}
function fetchandbuildMovieSection(fetchUrl, categoryName) {
  //console.table(fetchUrl, category.id, category.name);
  return fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      // console.table(res.results);
      const movies = res.results;
      if (Array.isArray(movies) && movies.length) {
        buildMovieSection(movies, categoryName);
      }
      return movies;
    })

    .catch((err) => console.log(err));
}

function buildMovieSection(listOfMovies, categoryName) {
  console.log(listOfMovies, categoryName);

  const moviesCont = document.getElementById("movies-cont");

  const moviesListHTML = listOfMovies
    .map((item) => {
      return `
      <div class="movie-item">

      <img class="movie-item-img" src="${imagePath}${item.backdrop_path}" alt="${item.title}">
      <iframe style = "display:none" width="245px" height="150px" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"></iframe>
      </div>`;
    })
    .join(""); //doubtful

  const moviesSectionHTML = `
      <h2 class="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></h2>
      <div class="movies-row">
            ${moviesListHTML}
      </div>
   `;

  console.log(moviesSectionHTML);
  const div = document.createElement("div");
  div.className = "movies-section";

  div.innerHTML = moviesSectionHTML;

  moviesCont.append(div);
}

// {
// <div class="movies-cont container" id="movies-cont">
//     <div class="movies-section">
//         <h2 class="movie-section-heading">Trending Now<span class="explore-nudge">Explore All</span></h2>
//         <div class="movies-row">
//             <img class="movie-item" src="https://occ-0-4209-3663.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABRsxRQpfjhaFamckqJTo-C2rN3JARSdoMXVm3O36p0S0YxjJQOI3jeWglUZp9uvurjmCyrJUGwQHkOn5gNBVAh8LA11pRRqMymI.jpg?r=a35" alt="JhoothiMakkar">
//             <img class="movie-item" src="https://occ-0-4209-3663.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABW1TtzxO8hSt1aR4gQ3ZosZsdAGDx6R_Eu-DQpeMaq_cbzfKxPbKWJpb_6dLl7fbjnKLtwrfTZW245Y5uAnxRLRtoiRxo2nNPNg.jpg?r=466" alt="">
//             <img class="movie-item" src="https://occ-0-4209-3663.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABWW0RLr_ty6Od9x_Wrb-pfoGki05KN-Ld6MP1TQXV4e3431TB4bKnhBNA5XXdl-dEdJQ7kGrtx6tPYB2ubQGDlWtRgrfk4TKo2U.jpg?r=96e" alt="DearZindegi">
//             <img class="movie-item" src="https://occ-0-4209-3663.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABU6cv0Q0-AjRvtCD3aN9xlsrMUhU8C3HlFvNI6sbo1C4JOqMAI3a5rDugYQkDOf84dMH11naG8OyF2BTdp-__bbphTIAS8YmgyY.jpg?r=477" alt="JhoothiMakkar">
//             <img class="movie-item" src="https://occ-0-4209-3663.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABTvg0d-L8lhnQ2g_mr62Sa6x3Dj9rj6hl0ySU9LGcKNzkOyyk9FmwJaNhiZmIFZfg7bQisx8COW5rIjQH1PLZG8qXqJ2Aaxr_J0.jpg?r=cbd" alt="">
//             <img class="movie-item" src="https://occ-0-4209-3663.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABfuuxsA7N69-X87aLzoTTWkjlbYcINU4HNaEyQi5owFkm5bEScdtKKpQcduuaFAo2LzXU8Hg_3ufMqYrsxz82FwGZtOWDDAVy8o.jpg?r=fe6" alt="DearZindegi">
//             <img src="https://www.google.com/search?rlz=1C1CHZL_enIN907IN907&sxsrf=APwXEdcO3soeAWjYbwFQf83_iherdWNbxg:1683806343978&q=Pathaan&stick=H4sIAAAAAAAAAOOQUeLVT9c3NMwxKTeySM6KN-LJzS_LTFXISFHISy2P4oXwCjKTS0qLUk8xoiqG8Qurss3TC9JSYPwsI8MS48rCAhi_KL4kxyS-LB3GzyswzMjKKDP4xcjji2RbAwvjIlb2gMSSjMTEvFtskgwlz67NEtwk8zP32EwlrdNXDMzdigp5etMyAM1o91-2AAAA&sa=X&ved=2ahUKEwiijoO4m-3-AhWT8DgGHff1CAwQs9oBKAB6BAgtEAI" alt="">

//         </div>
//     </div>
// }

function searchMovieTrailer(movieName) {
  if (!movieName) return;
  fetch(apiPath.searchOnYoutube(movieName))
    .then((res) => res.json())
    .then((res) => {
      const bestResults = res.items[0];
      const youtubeUrl = `https://www.youtube.com/watch?v=${bestResults.id.videoId}`;
      console.log(youtubeUrl);
      window.open(youtubeUrl, "_blank");
    })

    .catch((err) => console.log(err));
}

window.addEventListener("load", function () {
  init();
  //* providing black color nav in the header section on scroll*/
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 5) header.classList.add("black-bg");
    else header.classList.remove("black-bg");
  });
});
