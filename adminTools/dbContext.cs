using System;
using Microsoft.EntityFrameworkCore;

namespace adminTools
{
    public class dbContext : DbContext
    {
        public dbContext()
        {
            Database.GetDbConnection();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost; Port=5432; Database=FWebsite; Username=postgres; Password=user");
        }
    }
}