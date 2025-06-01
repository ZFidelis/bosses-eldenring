using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Boss> tb_bosses { get; set; }
        public DbSet<Weapon> tb_weapons { get; set; }
    }
}