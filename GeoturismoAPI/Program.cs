using GeoturismoAPI.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Reflection;
using GeoturismoAPI.Context;
using GeoturismoAPI.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// --- Configurações de serviços (equivalente ao ConfigureServices) ---

// Configurações de Controllers + JSON
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
    });

// Autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes("projetogeoturismo-chave-autenticacao")),
            ClockSkew = TimeSpan.FromHours(5),
            ValidIssuer = "ProjetoGeoturismo_webAPI",
            ValidAudience = "ProjetoGeoturismo_webAPI"
        };
    });

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "ProjetoGeoturismop_webAPI"
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
        c.IncludeXmlComments(xmlPath);
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Banco de dados
builder.Services.AddDbContext<GeoturismoContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Default"),
        x => x.UseNetTopologySuite()
    )
);

// Injeção de dependência
builder.Services.AddTransient<DbContext, GeoturismoContext>();
builder.Services.AddTransient<IUsuarioInterface, UsuarioRepository>();

var app = builder.Build();

// --- Configuração do pipeline HTTP (equivalente ao Configure) ---

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Swagger
app.UseSwagger(); // Gera o endpoint JSON do Swagger
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProjetoGeoturismo_webApi");
    c.RoutePrefix = string.Empty; // Faz o Swagger abrir na raiz (http://localhost:5000/)
});

app.UseRouting();

app.UseCors("CorPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
