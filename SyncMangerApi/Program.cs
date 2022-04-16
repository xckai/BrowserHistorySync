using Microsoft.EntityFrameworkCore;
using SyncMangerApi.Models;
using SyncMangerApi.Models.DB;
using SyncMangerApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
Console.WriteLine(builder.Configuration.GetConnectionString("pgsql"));
builder.Services.AddScoped<DbSyncService>();
builder.Services.AddDbContext<BrowserHistoryContext>(dbBuilder=>dbBuilder.UseNpgsql(builder.Configuration.GetConnectionString("pgsql")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.WebHost.UseKestrel();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();