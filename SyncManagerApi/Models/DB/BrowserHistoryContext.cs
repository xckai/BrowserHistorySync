using Microsoft.EntityFrameworkCore;

namespace SyncManagerApi.Models.DB;

public class BrowserHistoryContext : DbContext
{
    public BrowserHistoryContext()
    {
    }

    public BrowserHistoryContext(DbContextOptions<BrowserHistoryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BrowserHistory> UrlHistories { get; set; } = null!;
    public virtual DbSet<ExcludeRule> ExcludeRules { get; set; } = null!;


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BrowserHistory>(entity =>
        {
            entity.ToTable("browser_history");
            
        });
        modelBuilder.Entity<ExcludeRule>(entity =>
        {
            entity.ToTable("exclude_rule");
            entity.Property(e => e.RuleType).HasConversion<string>();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    private void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
    }
}