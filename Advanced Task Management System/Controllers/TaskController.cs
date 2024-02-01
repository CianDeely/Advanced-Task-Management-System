using Advanced_Task_Management_System.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging; // Add this using statement for ILogger
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
    public async Task<IActionResult> Get()
    {
        try
        {
            var tasks = await _dbContext.MyTasks.ToListAsync();
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving tasks");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost(Name = "tasks")]
    public async Task<IActionResult> Post([FromBody] MyTask newTask)
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

            return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding task");
            return StatusCode(500, "Internal server error");
        }
    }
}