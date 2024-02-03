using Advanced_Task_Management_System.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly TaskDbContext _dbContext;
    private readonly ILogger<TaskController> _logger;

    public TaskController(TaskDbContext dbContext, ILogger<TaskController> logger)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet(Name = "tasks")]
    public async Task<IActionResult> GetAllTasks([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var tasks = await _dbContext.MyTasks
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Check if there are more tasks
            var totalCount = await _dbContext.MyTasks.CountAsync();
            var hasMore = (page * pageSize) < totalCount;

            // Add Link header for pagination
            if (hasMore)
            {
                var nextPage = Url.Link("tasks", new { page = page + 1, pageSize });
                Response.Headers.Add("Link", $"<{nextPage}>; rel=\"next\"");
            }

            return Ok(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving tasks");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost(Name = "tasks")]
    public async Task<IActionResult> CreateTask([FromBody] MyTask newTask)
    {
        if (newTask == null)
        {
            return BadRequest("Invalid task");
        }

        try
        {
            newTask.Id = 0; 

            _dbContext.MyTasks.Add(newTask);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateTask), new { id = newTask.Id }, newTask);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding task");
            return StatusCode(500, "Internal server error");
        }
    }   

    [HttpPut("tasks/{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] MyTask updatedTask)
    {
        if (id != updatedTask.Id)
        {
            return BadRequest();
        }

        _dbContext.Entry(updatedTask).State = EntityState.Modified;

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_dbContext.MyTasks.Any(t => t.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("tasks/{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _dbContext.MyTasks.FindAsync(id);

        if (task == null)
        {
            return NotFound();
        }

        _dbContext.MyTasks.Remove(task);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("tasks/{id}")]
    public async Task<IActionResult> GetTask(int id)
    {
        var task = await _dbContext.MyTasks.FindAsync(id);

        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }
}
