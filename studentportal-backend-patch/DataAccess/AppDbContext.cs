using Microsoft.EntityFrameworkCore;
using StudentPortalAPI.Models;

namespace StudentPortalAPI.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
    }
}
