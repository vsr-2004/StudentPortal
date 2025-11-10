using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentPortalAPI.DataAccess;
using StudentPortalAPI.Models;

namespace StudentPortalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public StudentsController(AppDbContext db)
        {
            _db = db;
        }

        // GET /api/students
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _db.Students.ToListAsync();
            return Ok(students);
        }

        // GET /api/students/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var student = await _db.Students.FindAsync(id);
            if (student == null) return NotFound();
            return Ok(student);
        }

        // POST /api/students
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Student student)
        {
            _db.Students.Add(student);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = student.Id }, student);
        }

        // PUT /api/students/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Student student)
        {
            var existing = await _db.Students.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = student.Name;
            existing.Age = student.Age;
            existing.Course = student.Course;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE /api/students/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _db.Students.FindAsync(id);
            if (existing == null) return NotFound();

            _db.Students.Remove(existing);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
