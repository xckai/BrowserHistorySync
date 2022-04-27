using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SyncManagerApi.Migrations
{
    public partial class add_referrer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Referrer",
                table: "browser_history",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Referrer",
                table: "browser_history");
        }
    }
}
