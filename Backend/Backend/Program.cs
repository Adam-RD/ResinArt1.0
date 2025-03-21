using Backend.Data;
using Backend.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"));
});

// Inyección de dependencias para repositorios
builder.Services.AddScoped<IPedidoPendienteRepository, PedidoPendienteRepository>();
builder.Services.AddScoped<IDeudaRepository, DeudaRepository>();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodo",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Configuración de autenticación JWT
var token = builder.Configuration.GetSection("AppSettings:Token").Value;

if (string.IsNullOrEmpty(token))
{
    throw new InvalidOperationException("El token no está configurado en AppSettings.");
}

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(token)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

// Habilitar CORS antes de la autenticación
app.UseCors("PermitirTodo");

// Habilitar autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// Manejo de excepciones global
app.UseExceptionHandler(appBuilder =>
{
    appBuilder.Run(async context =>
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync("An unexpected error occurred.");
    });
});

app.UseHttpsRedirection();

// Registra controladores y rutas de fallback
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
