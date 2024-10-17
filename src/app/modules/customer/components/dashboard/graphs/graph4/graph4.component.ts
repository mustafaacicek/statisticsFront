import { Component } from '@angular/core';
import {Graph4ServiceService} from "./graph4-service.service";
import { Chart, ChartConfiguration } from "chart.js";
import {functions} from "../../../../../../environment/functions";

@Component({
  selector: 'app-graph4',
  templateUrl: './graph4.component.html',
  styleUrls: ['./graph4.component.scss']
})

export class Graph4Component {
  constructor(private motorSalesService: Graph4ServiceService) {}

  ngOnInit(): void {
    this.motorSalesService.getChart4().subscribe(data => {
      this.createMotorSalesChart(data);
    });
  }

  createMotorSalesChart(apiData: any[]): void {
    const chartData = apiData;
    const { month, year } =  functions.getLastMonthAndYear();
    const labels = chartData.map(brand => brand[0]);
    const salesData = chartData.map(brand => brand[1]);

    const last16SalesData = salesData.slice(-16);
    const totalLast16Sales = last16SalesData.reduce((acc, val) => acc + val, 0);

    const newLabels = [...labels.slice(0, -16), 'Son 16 Toplam'];
    const newSalesData = [...salesData.slice(0, -16), totalLast16Sales];

    const totalSales = newSalesData.reduce((acc, val) => acc + val, 0);

    const dataset2024 = {
      label: '2024 Satışları',
      data: newSalesData,
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(236,23,23,0.6)',
        'rgba(250,147,43,0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 0, 255, 0.6)',
        'rgb(255,221,0)',
        'rgba(128, 0, 128, 0.6)',
        'rgba(0, 128, 0, 0.6)',
        'rgba(0, 0, 255, 0.6)',
        'rgba(255, 0, 0, 0.6)'
      ],
      borderColor: 'rgba(71, 73, 73, 0.6)',
      borderWidth: 1,
      hoverOffset: 30,
    };

    const chartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: `İLK 26 FİRMANIN OCAK - ${month} ${year} PAZAR PAYI `,
          font: {
            size: 24,
            weight: 'bold',
            family: 'Arial',
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = Number(context.raw); // Ensure value is a number
              const percentage = ((value / totalSales) * 100).toFixed(2);

              if (context.label === 'Son 16 Toplam') {
                return `Son 16 Toplam: ${value} (${((totalLast16Sales / totalSales) * 100).toFixed(2)}%)`;
              }

              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };

    const chart = new Chart('motorSalesChart', {
      type: 'pie',
      data: {
        labels: newLabels,
        datasets: [dataset2024],
      },
      options: chartOptions,
    });
  }

  toggleFullscreen(): void {
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        chartContainer.requestFullscreen().then(() => {
          const chart = Chart.getChart('motorSalesChart');
          if (chart) {
            chart.resize();
          }
        }).catch(err => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      }
    }
  }
}
