fetch("/api/v1/statistic")
  .then((response) => response.json())
  .then((data) => {
    const ctx = document.getElementById("bookingChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: data.chartData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
            },
          },
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
