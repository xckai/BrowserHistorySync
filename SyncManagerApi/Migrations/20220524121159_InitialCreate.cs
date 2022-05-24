using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SyncManagerApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "browser_history",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Timestamp = table.Column<long>(type: "bigint", nullable: false),
                    FaviconUrl = table.Column<string>(type: "text", nullable: true),
                    Referrer = table.Column<string>(type: "text", nullable: true),
                    EquipmentName = table.Column<string>(type: "text", nullable: true),
                    BrowserType = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_browser_history", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "exclude_rule",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RuleType = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_exclude_rule", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_browser_history_Timestamp",
                table: "browser_history",
                column: "Timestamp");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "browser_history");

            migrationBuilder.DropTable(
                name: "exclude_rule");
        }
    }
}
