using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Advanced_Task_Management_System.Middleware;
using Advanced_Task_Management_System.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace Advanced_Task_Management_System
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add Entity Framework Core with SQL Server
            services.AddCors();
            services.AddControllers();

            // Add other services and configurations as needed
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMiddleware<RequestLoggingMiddleware>();
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        }
    }
}

