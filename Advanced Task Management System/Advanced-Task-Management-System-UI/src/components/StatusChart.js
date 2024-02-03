// StatusChart.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StatusChart = ({ statusCounts }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (statusCounts && statusCounts.length > 0) {
      const ctx = document.getElementById("StatusChartCanvas").getContext("2d");

      // Destroy existing Chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const labels = statusCounts.map((status) => getStatusLabel(status.status));
      const data = statusCounts.map((status) => status.count);

      // Create a new Chart instance
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

    // Cleanup function to destroy the Chart instance on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [statusCounts]);

  

  const getStatusLabel = (status) => {
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
    const colors = ["#FF5733", "#33FF57", "#3366FF", "#FFFF00"];
    return colors.slice(0, count);
  };

  return (
    <div>
            {statusCounts.length > 0 ? (
      <canvas id="StatusChartCanvas" width="300" height="150"></canvas>
            ) : (
              <h2></h2>
            )}
    </div>
  );
};

export default StatusChart;
