using System;
using Microsoft.EntityFrameworkCore;

namespace Advanced_Task_Management_System.Models
{

    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {
        }

        public DbSet<MyTask> MyTasks { get; set; }
    }
}

