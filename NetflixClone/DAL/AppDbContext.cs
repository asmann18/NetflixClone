using Microsoft.EntityFrameworkCore;
using NetflixClone.Entities;

namespace NetflixClone.DAL
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt):base(opt)
        {
                
        }


        public DbSet<Movie> Movies { get; set; }
    }
}
