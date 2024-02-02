using System;
using Advanced_Task_Management_System.Enums;
using Microsoft.EntityFrameworkCore;

namespace Advanced_Task_Management_System.Models
{
 
    public class MyTask
	{
		public MyTask()
		{

		}

        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public Priority Priority { get; set; }
        public DateTime Due_Date { get; set; }
        public Status Status { get; set; }
    }

}

