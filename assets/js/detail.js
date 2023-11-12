
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header')
    let scrollY = window.scrollY
  
    if (scrollY > 5) {
      header.classList.add('scrolledHeader')
    } else {
  
      header.classList.remove('scrolledHeader')
    }
  })
  const topMovies = document.querySelector('.topMovieCards')
  
  



const h1=document.querySelector('.h1')
const id=window.location.search.slice(4)

const getMovieById=async()=>{
    const response=await fetch(`https://localhost:7237/Movies/MovieGetById/${id}`)
    const movie=await response.json()
    console.log(movie);
}


getMovieById();