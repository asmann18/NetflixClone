namespace NetflixClone.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Genres { get; set; }
        public string? Language { get; set; }
        public int? RunTime { get; set; }
        public decimal? Rating { get; set; }
        public DateTime? DateTime { get; set; }
        public string Image { get; set; }
    }
}
