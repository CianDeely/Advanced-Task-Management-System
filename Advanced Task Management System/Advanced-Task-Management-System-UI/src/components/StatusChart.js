import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
{/* Pull in our chart library */ }

const StatusChart = ({ statusCounts }) => {
    {/* Status counts are returned from the API in the GetAllTasks function, we can use these */ }
  const chartRef = useRef(null);
  {/* Keep a reference to the chart so we can destroy it later */}
  useEffect(() => {
    if (statusCounts && statusCounts.length > 0) {           
      {/* Make sure there are tasks before we create a chart */}
      const ctx = document.getElementById("StatusChartCanvas").getContext("2d");

    {/* Destroy existing Chart instance if it exists*/}
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const labels = statusCounts.map((status) => getStatusLabel(status.status));
      {/* Use our helper function to convert int from enums to string for display*/}
      const data = statusCounts.map((status) => status.count);

      {/* Create a new Chart instance */}
      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Task Status Distribution",
              data: data,
              backgroundColor: getStatusColors(statusCounts.length),
            },
          ],
        },
      });
    }

    {/* Cleanup function to destroy the Chart instance on component unmount */}
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [statusCounts]);



  const getStatusLabel = (status) => {           
    {/* Helper function to convert int from status enum to string for display purposes */}
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "In Progress";
      case 2:
        return "Completed";
      case 3:
        return "Archived";
      default:
        return "Unknown Status";
    }
  };

  const getStatusColors = (count) => {
    {/* Set some UI friendly colours for our chart display */}
    const colors = ["#7633FF", "#33C2FF", "#33FFD1", "#FFAB33"];
    return colors.slice(0, count);
  };

  return (
    <div>          
      {/* Conditionally display the chart only if we have atleast one task */}
      {statusCounts.length > 0 ? (
        <canvas id="StatusChartCanvas" width="300" height="150"></canvas>
      ) : (
        <h2></h2>
      )}
    </div>
  );
};

export default StatusChart;
