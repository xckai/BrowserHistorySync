using Microsoft.EntityFrameworkCore;

namespace SyncMangerApi.Models.DB
{
    public partial class BrowserHistoryContext : DbContext
    {
        public BrowserHistoryContext()
        {
        }

        public BrowserHistoryContext(DbContextOptions<BrowserHistoryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UrlHistory> UrlHistories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UrlHistory>(entity =>
            {
                entity.ToTable("url_history");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.HistoryDetail)
                    .HasColumnType("jsonb")
                    .HasColumnName("history_detail");

                entity.Property(e => e.Timestamp).HasColumnName("timestamp");
            });


            OnModelCreatingPartial(modelBuilder);
        }
        
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
