﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SyncManagerApi.Models.DB;

#nullable disable

namespace SyncManagerApi.Migrations
{
    [DbContext(typeof(BrowserHistoryContext))]
    partial class BrowserHistoryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("SyncManagerApi.Models.DB.BrowserHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("BrowserType")
                        .HasColumnType("text");

                    b.Property<string>("EquipmentName")
                        .HasColumnType("text");

                    b.Property<string>("FaviconUrl")
                        .HasColumnType("text");

                    b.Property<string>("Referrer")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset?>("Timestamp")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("browser_history", (string)null);
                });

            modelBuilder.Entity("SyncManagerApi.Models.DB.ExcludeRule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("RuleType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("exclude_rule", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
