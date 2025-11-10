This patch contains the backend files to add EF Core DbContext, Student model and StudentsController (CRUD), plus an updated Program.cs which enables CORS for the Angular dev server.

Files included
- Program.cs (updated)
- DataAccess/AppDbContext.cs
- Models/Student.cs
- Controllers/StudentsController.cs

How to apply
1. Copy the contents of this patch into your ASP.NET project (the folder that contains the .csproj).
   - Copy Program.cs (overwrite your existing Program.cs after backing it up)
   - Create the folders DataAccess, Models, Controllers and add the corresponding files

2. From the backend project folder (where your .csproj is located), run these commands in PowerShell (no admin required unless noted):

```powershell
# restore packages
dotnet restore

# add EF Core SQL Server provider and tools
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

# install dotnet-ef globally if you don't have it already (no admin required normally)
dotnet tool install --global dotnet-ef

# create initial migration
dotnet ef migrations add InitialCreate

# apply migration to the database
dotnet ef database update

# run the app
dotnet run
```

Notes
- The patch assumes your `appsettings.json` already contains a connection string named "StudentDB" (your provided appsettings.json has it). If you need SQL auth, update the connection string accordingly.
- Program.cs in this patch adds a CORS policy allowing http://localhost:4200 (Angular dev server).
- Your Angular project already has a proxy configured so frontend calls to `/api` are forwarded to the backend at https://localhost:7202.

Troubleshooting
- If `dotnet ef migrations add` complains about build errors, run `dotnet build` and fix the compile errors first.
- If you see SSL certificate trust errors in the browser, run:

```powershell
# trust dev cert on Windows (may prompt and require confirmation)
dotnet dev-certs https --trust
```

- If your SQL Server requires SQL authentication, change connection string in appsettings.json to include `User Id` and `Password`.

If you want, I can generate a .zip of this patch for you to download and then you can extract into your backend project folder. After you apply these files and run the commands above, paste any output/errors here and I will help fix them.
