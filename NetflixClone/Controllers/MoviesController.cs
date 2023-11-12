using Microsoft.AspNetCore.Mvc;
using NetflixClone.DAL;
using NetflixClone.Entities;
using System.Text.Json;

namespace NetflixClone.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : Controller
    {

        private readonly AppDbContext _appDbContext;

        public MoviesController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMovies(int pages, int limit = 10)
        {
            List<Movie> movies = new();
            if (pages is not 0)
            {
                movies = _appDbContext.Movies.Skip((pages - 1) * limit).Take(limit).ToList();
                 
            }
            else
            {
                movies = _appDbContext.Movies.ToList();

            }
            var json = JsonSerializer.Serialize(movies);
            return Ok(json);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> SearchMovies(string search)
        {
            var movies = _appDbContext.Movies.Where(m => m.Name.ToLower().Contains(search.ToLower())).ToList();
            var json= JsonSerializer.Serialize(movies);
            return Ok(json);
        }


        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> MovieGetById([FromRoute]int id)
        {
            var movie=_appDbContext.Movies.FirstOrDefault(m=>m.Id==id);
            var json=JsonSerializer.Serialize(movie);

            return Ok(json);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var popMovies = _appDbContext.Movies.OrderByDescending(m => m.Rating).Take(10).ToList();
            var json = JsonSerializer.Serialize(popMovies);
            return Ok(json);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovies(List<Movie> movies)
        {
            foreach (Movie movie in movies)
            {
                await _appDbContext.Movies.AddAsync(movie);
            }
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> FilterMoviesByGenre(string genre, int pages, int limit = 10)
        {

            List<Movie> movies = new();
            if (pages is not 0)
            {
                
                movies =_appDbContext.Movies.Where(m=>m.Genres.ToLower().Contains(genre.ToLower())).Skip((pages - 1) * limit).Take(limit).ToList();

            }
            else
            {
                movies =_appDbContext.Movies.Where(m=>m.Genres.ToLower().Contains(genre.ToLower())).ToList();

            }

            var json = JsonSerializer.Serialize(movies);
            return Ok(json);
        }
    }
}
