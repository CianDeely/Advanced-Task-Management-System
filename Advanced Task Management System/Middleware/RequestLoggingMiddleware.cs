using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace Advanced_Task_Management_System.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLoggingMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task Invoke(HttpContext context)
        {
            Log.Information($"Request {context.Request.Method} {context.Request.Path} received.");

            // Call the next middleware in the pipeline
            await _next(context);

            Log.Information($"Response {context.Response.StatusCode} for {context.Request.Method} {context.Request.Path}.");
        }
    }
}

