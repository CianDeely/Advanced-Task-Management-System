using System;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Advanced_Task_Management_System.Models
{

    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {
        }

        public DbSet<MyTask> MyTasks { get; set; }

        public override int SaveChanges()
        {
            HandleTaskPriorityChanges();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            HandleTaskPriorityChanges();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void HandleTaskPriorityChanges()
        {
            var highPriorityTasks = ChangeTracker
                .Entries<MyTask>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified)
                .Select(e => e.Entity)
                .Where(task => task.Priority == Priority.High);

            foreach (var task in highPriorityTasks)
            {
                LogCriticalUpdate(task);
            }
        }

        private void LogCriticalUpdate(MyTask task)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.File(task.Id + "-" + task.Title + "-log.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();

            Log.Logger.Information($"Critical Update: Task {task.Id}, {task.Title} has high priority. The task has a due date and time of {task.Due_Date}");
            task.Previous_Priority = task.Priority;
        }
    }
}

