using Microsoft.EntityFrameworkCore;
using back.models;

namespace back.db
{
    public class dbContextFWebsite : DbContext
    {
        public DbSet<user> Users { get; set; }
        public DbSet<client> Clients { get; set; }
        public DbSet<contentpages> Contentpages { get; set; }
        public DbSet<room> Rooms { get; set; }
        public DbSet<chat> Chats { get; set; }
        public DbSet<chatMessages> ChatMessages { get; set; }
        public DbSet<message> Messages { get; set; }
        public dbContextFWebsite()
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost; Port=5432; Database=FWebsite; Username=postgres; Password=user");
        }
    }
}