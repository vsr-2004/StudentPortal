using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace StudentPortalAPI.Tests
{
    public class IntegrationTests : IClassFixture<WebApplicationFactory<global::Program>>
    {
        private readonly WebApplicationFactory<global::Program> _factory;

        public IntegrationTests(WebApplicationFactory<global::Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task Full_Register_Login_Student_CRUD_Flow()
        {
            using var client = _factory.CreateClient();

            // 1) Register a unique user
            var username = "test_" + Guid.NewGuid().ToString("N").Substring(0, 8);
            var registerBody = JsonSerializer.Serialize(new { username = username, password = "Test123!", email = username + "@example.com" });
            var regResp = await client.PostAsync("/api/auth/register", new StringContent(registerBody, Encoding.UTF8, "application/json"));
            regResp.EnsureSuccessStatusCode();

            // 2) Login and get token
            var loginBody = JsonSerializer.Serialize(new { username = username, password = "Test123!" });
            var loginResp = await client.PostAsync("/api/auth/login", new StringContent(loginBody, Encoding.UTF8, "application/json"));
            loginResp.EnsureSuccessStatusCode();
            var loginJson = await loginResp.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(loginJson);
            var token = doc.RootElement.GetProperty("token").GetString();
            Assert.False(string.IsNullOrEmpty(token));

            // Set bearer token for protected endpoints
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            // 3) Create student
            var studentCreate = JsonSerializer.Serialize(new { Name = "Integration Student", Email = "int@example.com", Age = 20 });
            var createResp = await client.PostAsync("/api/students", new StringContent(studentCreate, Encoding.UTF8, "application/json"));
            Assert.True(createResp.IsSuccessStatusCode);

            // 4) Get list and ensure at least one student exists
            var getResp = await client.GetAsync("/api/students");
            getResp.EnsureSuccessStatusCode();
            var studentsJson = await getResp.Content.ReadAsStringAsync();
            Assert.Contains("Integration Student", studentsJson);

            // Note: further update/delete checks are possible but this covers the primary E2E happy path.
        }
    }
}
