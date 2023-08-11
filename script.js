const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const CONTAINER = document.getElementById("container");

async function fetchapi() {
	const response = await fetch(APIURL);
	const data = await response.json();
	console.log(data);

	data.results.forEach(movie => {
		const FLIPCARD = document.createElement("div");
		FLIPCARD.classList.add("flip-card");

		FLIPCARD.innerHTML += `
				<div class="item">
                    <div class="Movie">
                        <div class="movieimage">
                            <img src=${IMGPATH}${movie.poster_path} alt="">
                        </div>
                        <div class="movieimageName">
                            <h2>${movie.title}</h2>
                        </div>
                    </div>
                    <div class="overlay">
                        <div>
                            <div class="movieName">
                                <h2>${movie.title}</h2>
                                <p>${movie.release_date}</p>
                            </div>
                            <div class="movieRating">
                                <div class="ratingicon">
                                    <i class="fa-solid fa-star"></i>
                                    <span>${movie.vote_average}</span>
                                </div>
                                <div class="overview">
                                    <div class="Rating">
                                        <span>Rating:</span>
                                        <p>${movie.vote_average} / 10 from ${movie.vote_count} users</p>
                                    </div>
                                </div>
                            </div>
                            <div class="Storyline">
                                <p>${movie.overview}</p>
                            </div>
                            <div class="movieActors">
                                <div>
                                    <span>Director: </span>
                                    <p>Christopher Nolan</p>
                                </div>
                                <!-- <div>
                                    <span>Creator: </span>
                                    <p></p>
                                </div> -->
                                <div>
                                    <span>Actors: </span>
                                    <p>Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
		`

		CONTAINER.appendChild(FLIPCARD);
	});
}
fetchapi()