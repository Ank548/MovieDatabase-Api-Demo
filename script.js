const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const CONTAINER = document.getElementById("container");

const PAGINATION = document.getElementById("pagination");

const REFRESH = document.getElementById("profile").lastElementChild;

const SEARCHMOVIE = document.getElementById("SearchMovie").firstElementChild;


async function fetchapi(api) {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}


async function fetchData(data) {

    CONTAINER.innerHTML = "";

    if (data.results.length == 0) {
        CONTAINER.innerHTML = "Movies Not Found";
    }

    data.results.forEach(movie => {
        const FLIPCARD = document.createElement("div");
        FLIPCARD.classList.add("flip-card");

        FLIPCARD.innerHTML +=
            `
				<div class="item">
                    <div class="Movie">
                        <div class="movieimage">
                            <img src=${movie.poster_path != null ? IMGPATH + movie.poster_path : '/image/poster-missing-2.jpg'} alt="">
                        </div>
                        <div class="movieimageName">
                            <h2>${movie.title != null ? movie.title : 'null'}</h2>
                        </div>
                    </div>
                    <div class="overlay">
                        <div>
                            <div class="movieName">
                                <h2>${movie.title != null ? movie.title : 'null'}</h2>
                                <p>${movie.release_date != null ? movie.release_date : 'null'}</p>
                            </div>
                            <div class="movieRating">
                                <div class="ratingicon">
                                    <i class="fa-solid fa-star"></i>
                                    <span>${movie.vote_average != null ? movie.vote_average.toFixed(1) : '0.0'}</span>
                                </div>
                                <div class="overview">
                                    <div class="Rating">
                                        <span>Rating:</span>
                                        <p>${movie.vote_average != null ? movie.vote_average.toFixed(1) : '0.0'} /10 from ${movie.vote_count != null ? movie.vote_count : '0'} users</p>
                                    </div>
                                </div>
                            </div>
                            <div class="Storyline">
                                <p>${movie.overview != null ? movie.overview : 'null'}</p>
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
		`;

        CONTAINER.appendChild(FLIPCARD);

        FLIPCARD.addEventListener("click", (event) => {
            event.currentTarget.firstElementChild.style.transform = "rotateY(180deg)";
        })

        FLIPCARD.addEventListener("mouseleave",(event)=>{
            event.currentTarget.firstElementChild.style.transform = "none";
        })
    });

}


function pagination(data) {

    const LISTS = PAGINATION.querySelector("#lists");
    LISTS.innerHTML = "";

    nextPrevious(data);

    for (let index = 1; index <= `${data.total_pages > 500 ? 500 : data.total_pages}`; index++) {
        const li = document.createElement("li");
        li.innerHTML = index;
        li.addEventListener("click", async (e) => {
            const SEARCHINPUTS = SEARCHMOVIE.value;

            PAGINATION.querySelector(".active").classList.remove("active")
            e.target.classList.add("active");

            if (SEARCHINPUTS == "") {
                const data = await fetchapi(`${APIURL}${e.target.innerHTML}`);
                fetchData(data);
                nextPrevious(data);
            } else {
                const data = await fetchapi(`${SEARCHAPI}${SEARCHINPUTS}&page=${e.target.innerHTML}`);
                fetchData(data);
                nextPrevious(data);
            }

        })
        LISTS.appendChild(li);
    }

    LISTS.children[0].classList.add("active");
}

PAGINATION.querySelector("#prev").addEventListener("click", () => {
    PAGINATION.querySelector(".active").previousElementSibling.click();
})

PAGINATION.querySelector("#next").addEventListener("click", () => {
    PAGINATION.querySelector(".active").nextElementSibling.click();
})

function nextPrevious(data) {
    const PREV = PAGINATION.querySelector("#prev");
    const NEXT = PAGINATION.querySelector("#next");

    if (data.page > 1) {
        PREV.style.visibility = "visible";
    } else {
        PREV.style.visibility = "hidden";
    }

    if (data.page < `${data.total_pages > 500 ? 500 : data.total_pages}`) {
        NEXT.style.visibility = "visible";
    } else {
        NEXT.style.visibility = "hidden";
    }

}

async function homepage(page = 1) {
    const data = await fetchapi(`${APIURL}${page}`);
    // console.log(data)
    fetchData(data);
    pagination(data);
};
// initcall
homepage();


SEARCHMOVIE.addEventListener("keyup", async (e) => {

    const SEARCHINPUTS = e.target.value;

    if (e.target.value === ""/* || (/^[^a-z0-9]/i).test(e.target.value)*/) {
        // homepage();
        const data = await fetchapi(`${APIURL}${1}`);
        fetchData(data);
    } else {
        const data = await fetchapi(`${SEARCHAPI}${SEARCHINPUTS}&page=${1}`);
        fetchData(data);
        pagination(data);
    }
})


REFRESH.addEventListener("click", () => {
    window.location.reload();
})