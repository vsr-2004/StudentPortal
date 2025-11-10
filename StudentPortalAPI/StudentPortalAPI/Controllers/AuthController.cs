using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StudentPortalAPI.DataAccess;
using StudentPortalAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudentPortalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            if (await _db.Users.AnyAsync(u => u.Username == req.Username))
                return Conflict(new { message = "Username already exists" });

            var hash = BCrypt.Net.BCrypt.HashPassword(req.Password);
            var user = new User { Username = req.Username, PasswordHash = hash, Email = req.Email };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == req.Username);
            if (user == null) return Unauthorized();

            if (!BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash)) return Unauthorized();

            var token = BuildToken(user);
            return Ok(new { token });
        }

        private string BuildToken(User user)
        {
            var jwt = _config.GetSection("Jwt");
            // Guard against missing configuration values to avoid passing null to Encoding.GetBytes
            var keyString = jwt["Key"] ?? throw new InvalidOperationException("JWT Key is not configured");
            var issuer = jwt["Issuer"] ?? string.Empty;
            var audience = jwt["Audience"] ?? string.Empty;
            var expiryMinutes = double.TryParse(jwt["ExpiryMinutes"], out var m) ? m : 60;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public record RegisterRequest(string Username, string Password, string? Email);
    public record LoginRequest(string Username, string Password);
}
