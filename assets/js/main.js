//change header background






window.addEventListener('scroll', () => {
  const header = document.querySelector('.header')
  let scrollY = window.scrollY

  if (scrollY > 20) {
    header.classList.add('scrolledHeader')
  } else {

    header.classList.remove('scrolledHeader')
  }
})
const topMovies = document.querySelector('.topMovieCards')



const baseUrl = `https://api.tvmaze.com/shows?limit=12&skip=5&select=key1,key2,key3`

// const fillDatabase = async () => {
//   const response = await axios(baseUrl);
//   const data = await response.data
//   let movies = []
//   data.forEach(movie => {
//     movies.push ({

//       name: movie.name,
//       description: movie.summary,
//       genres: movie.genres.join(','),
//       language: movie.language,
//       runTime: movie.runtime,
//       rating: movie.rating.average,
//       dateTime: movie.premiered,
//       image: movie.image.original
//     })

//   });
//   console.log(movies);
//   const postResponse=await axios.post('https://localhost:7237/Movies',movies)
// console.log(postResponse);
// }


// fillDatabase()



// trend movies


const openModal = async (id) => {
  const response = await fetch(`https://localhost:7237/Movies/MovieGetById/${id}`)
  const movie = await response.json();
  const modal = document.createElement('div')
  modal.classList.add('modal')
  const removeModal = () => {
    modal.remove();
  }
  const xButton = document.createElement('div')
  xButton.classList.add('xButton')
  xButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`
  modal.innerHTML = `
      <div class="modalHeader">
          <img src="${movie.Image}" alt="">
          <div class="image">
          <img src="${movie.Image}" alt="">
      </div>
          <div class="buttons">
              <button class="playButton"><i class="fa-solid fa-play"></i>play</button>
              <button class="iconButton"><i class="fa-solid fa-plus"></i></button>
              <button class="iconButton"><i class="fa-regular fa-heart"></i></button>
          </div>
      </div>
      <div class="modalBody">

          <div class="miniInfo">
              <span>83% Match</span> ${movie.DateTime.slice(0, 10)} ${movie.RunTime}min ${movie.Rating}IMDB   <p>HD</p>
          </div>
          <div class="description">${movie.Description}
          </div>

          <div class="genres">Genres:${movie.Genres}</div>
      </div>
  `
  modal.children[0].appendChild(xButton)
  xButton.addEventListener('click', () => {
    modal.remove()
  })
  const main = document.querySelector('main')
  main.appendChild(modal);
}
const fetchTopMovies = async () => {
  const response = await axios.get('https://localhost:7237/Movies/GetPopularMovies')
  const data = response.data

  data.map((movie, i) => {
    topMovies.innerHTML += `<a onclick="openModal(${movie.Id})" class="topMovieCard">
    <img src="${movie.Image}">
    <div class="movieInfo">
    <p>${movie.Name}</p>
    <span>${movie.RunTime} min / ${movie.Rating} IMDB</span>
    </div>
    </a>`
  })
}


fetchTopMovies();
let pages = 1

const forYouMovies = document.querySelector('.forYourMovieCards')

const fetchForYourMovies = async () => {
  const response = await axios.get(`https://localhost:7237/Movies?pages=${pages}&limit=21`)
  const data = response.data

  data.map((movie, i) => {
    forYouMovies.innerHTML += `<a onclick="openModal(${movie.Id})" class="topMovieCard">
    <img src="${movie.Image}">
    <div class="movieInfo">
    <p>${movie.Name}</p>
    <span>${movie.RunTime} min / ${movie.Rating} IMDB</span>
    </div>
    </a>`
  })
}

fetchForYourMovies()


const loadMoreButton = document.querySelector('.loadMore')


loadMoreButton.addEventListener('click', () => {
  pages++;
  setInterval(() => {
    loadMoreButton.setAttribute("disabled", "")
  }, 3000)
  fetchForYourMovies()
})



const searchButton = document.querySelector('.searchButton')
const searchInput = document.querySelector('.searchInput')
const searchSection = document.querySelector('.search')
searchButton.addEventListener('click', () => {
  searchInput.classList.add('showInput')
  searchSection.classList.add('createBorder')

})
searchInput.addEventListener('focusout', () => {
  searchInput.classList.remove('showInput')
  searchSection.classList.remove('createBorder')

})

searchInput.addEventListener('input', async () => {
  if (searchInput.value.trim().length === 0 || searchInput.value.trim()=='') {
    pages = 1;
    forYouMovies.innerHTML=''
    fetchForYourMovies()
   
  } else {
    const response = await axios.get(`https://localhost:7237/Movies/SearchMovies?search=${searchInput.value}`)
    const data = response.data;
    forYouMovies.innerHTML = ''
    if (data.length === 0) {
      forYouMovies.innerHTML = `<a class="topMovieCard">
      <img src="./assets/images/notFound.jpg">
      <div class="movieInfo">
      <p>Movie Not Found!.</p>
      <span>0 min / 0 IMDB</span>
      </div>
      </a>`
    }
    data.map((movie, i) => {
      forYouMovies.innerHTML += `<a onclick="openModal(${movie.Id})" class="topMovieCard">
      <img src="${movie.Image}">
      <div class="movieInfo">
      <p>${movie.Name}</p>
      <span>${movie.RunTime} min / ${movie.Rating} IMDB</span>
      </div>
      </a>`
    })
  }
})