using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SyncMangerApi.Models
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
//             if (!optionsBuilder.IsConfigured)
//             {
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                 optionsBuilder.UseNpgsql("User ID=admin;Password=Admin123;Host=10.0.0.78;Port=5433;Database=browserhistory;Pooling=true;");
//             }
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
