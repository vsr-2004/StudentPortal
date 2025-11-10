namespace StudentPortalAPI.Models
{
    public class Student
    {
        // Use StudentID to remain compatible with existing StudentDAL
        public int StudentID { get; set; }

        public string Name { get; set; } = null!;

        // Optional email used by existing DAL
        public string? Email { get; set; }

        public int Age { get; set; }

        // Note: Course column not present in existing DB; omitted to match existing StudentDAL/schema
    }
}
