const apiBaseUrl="https://api.themoviedb.org/3";
const apiKey="69c7645e518203c0fca85ada87e59c40";
const imageBaseUrl="https://image.tmdb.org/t/p/w300"

const moviesGrid=document.getElementById("movies-grid");
const searchInput=document.getElementById("search-input");
const searchForm=document.getElementById("search-form");
const categoryTitle=document.getElementById("category-title");

async function fetchMoviesNowPlaying() { 
    const response = await fetch(`${apiBaseUrl}/movie/top_rated?api_key=${apiKey}` ); 
    const jsonResponse=await response.json();
    const movies = await Promise.all(
        jsonResponse.results.map(async (movie)=>({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            IMDbId:await getIMDbId(movie.id)

        }))
    )
    displayMovies(movies);
}
async function searchMovies(query) { 
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query="${query}"` ); 
    const jsonResponse=await response.json();
    const movies = await Promise.all(
        jsonResponse.results.map(async (movie)=>({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            IMDbId:await getIMDbId(movie.id)

        }))
    )
    displayMovies(movies);
}

function displayMovies(movies){
    moviesGrid.innerHTML=movies
    .map(movie =>
        `<div class="movie-card">
        <a href="https://www.imdb.com/title/${movie.IMDbId}/">
               <img src="${imageBaseUrl}${movie.poster_path}"/>
        <p>⭐ ${movie.vote_average}</p>
        <h1>${movie.title}</h1>
        </div>`
).join("");
}
function handleSearchFormSubmit(event){
    event.preventDefault();
    categoryTitle.innerHTML="Search Results";
    const searchQuery=searchInput.value;
    searchMovies(searchQuery);
}

 async function getIMDbId(movieId){
const response=await fetch(`${apiBaseUrl}/movie/${movieId}/external_ids?api_key=${apiKey}` );
const jsonResponse=await response.json();
return jsonResponse.imdb_id;
 }
 searchForm.addEventListener("submit",handleSearchFormSubmit);
fetchMoviesNowPlaying();
