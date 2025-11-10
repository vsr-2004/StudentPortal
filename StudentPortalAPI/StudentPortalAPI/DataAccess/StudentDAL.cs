using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

using Microsoft.Extensions.Configuration;
using StudentPortalAPI.Models;

namespace StudentPortalAPI.DataAccess
{
    public class StudentDAL
    {
        private readonly string _connectionString;

        public StudentDAL(IConfiguration configuration)
        {
            // Fail fast if the connection string is not configured to avoid null-reference warnings/runtime errors.
            _connectionString = configuration.GetConnectionString("StudentDB")
                ?? throw new InvalidOperationException("Connection string 'StudentDB' is not configured.");
        }

        public List<Student> GetAllStudents()
        {
            var students = new List<Student>();
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Students";
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    students.Add(new Student
                    {
                        StudentID = Convert.ToInt32(reader["StudentID"]),
                        Name = reader["Name"]?.ToString() ?? string.Empty,
                        Age = Convert.ToInt32(reader["Age"]),
                        Email = reader["Email"] == DBNull.Value ? null : reader["Email"]?.ToString()
                    });
                }
            }
            return students;
        }

        public void AddStudent(Student student)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = "INSERT INTO Students (Name, Age, Email) VALUES (@Name, @Age, @Email)";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Name", student.Name);
                cmd.Parameters.AddWithValue("@Age", student.Age);
                cmd.Parameters.AddWithValue("@Email", student.Email);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public Student? GetStudentById(int id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Students WHERE StudentID = @Id";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Id", id);
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    return new Student
                    {
                        StudentID = Convert.ToInt32(reader["StudentID"]),
                        Name = reader["Name"]?.ToString() ?? string.Empty,
                        Age = Convert.ToInt32(reader["Age"]),
                        Email = reader["Email"] == DBNull.Value ? null : reader["Email"]?.ToString()
                    };
                }
            }
            return null;
        }

        public void UpdateStudent(int id, Student student)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = "UPDATE Students SET Name = @Name, Age = @Age, Email = @Email WHERE StudentID = @Id";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Name", student.Name);
                cmd.Parameters.AddWithValue("@Age", student.Age);
                cmd.Parameters.AddWithValue("@Email", student.Email);
                cmd.Parameters.AddWithValue("@Id", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void DeleteStudent(int id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = "DELETE FROM Students WHERE StudentID = @Id";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Id", id);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        // You can add UpdateStudent and DeleteStudent methods similarly for full CRUD.
    }
}
