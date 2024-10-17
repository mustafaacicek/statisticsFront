import { Component } from '@angular/core';
import {Graph4ServiceService} from "../graph4/graph4-service.service";
import {Chart, ChartConfiguration} from "chart.js";
import {functions} from "../../../../../../environment/functions";

@Component({
  selector: 'app-graph4-1',
  templateUrl: './graph4-1.component.html',
  styleUrl: './graph4-1.component.scss'
})
export class Graph41Component {


  constructor(private motorSalesService: Graph4ServiceService) {
  }

  ngOnInit(): void {
    this.motorSalesService.getChart4().subscribe(data => {
      this.createMotorSalesChart(data);
    });
  }

  createMotorSalesChart(apiData: any[]): void {
    const chartData = apiData;
    const { month, year } =  functions.getLastMonthAndYear();
    const mergedSalesData = chartData.reduce((acc, brand) => {
      const [brandName, sales] = brand;

      if (brandName === 'KUBA' || brandName === 'RKS') {
        acc['KUBA/RKS'] = (acc['KUBA/RKS'] || 0) + sales;
      } else {
        acc[brandName] = (acc[brandName] || 0) + sales;
      }

      return acc;
    }, {});

    const labels = Object.keys(mergedSalesData);
    const salesData = Object.values(mergedSalesData);

    const last16SalesData = salesData.slice(-16);
    // @ts-ignore
    const totalLast16Sales = last16SalesData.reduce((acc, val) => acc + val, 0);

    const newLabels = [...labels.slice(0, -16), 'Son 16 Toplam'];
    const newSalesData = [...salesData.slice(0, -16), totalLast16Sales];

    // @ts-ignore
    const totalSales = newSalesData.reduce((acc, val) => acc + val, 0);

    const dataset2024 = {
      label: '2024 Satışları',
      data: newSalesData,
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',   // Mavi
        'rgba(255, 99, 132, 0.6)',  // Kırmızı
        'rgba(255, 206, 86, 0.6)',   // Sarı
        'rgba(75, 192, 192, 0.6)',   // Yeşil
        'rgba(153, 102, 255, 0.6)',  // Mor
        'rgba(255, 159, 64, 0.6)',   // Turuncu
        'rgba(255, 0, 255, 0.6)',    // Pembe
        'rgba(0, 255, 255, 0.6)',    // Camgöbeği
        'rgba(128, 0, 128, 0.6)',    // Mor
        'rgba(0, 128, 0, 0.6)',      // Koyu yeşil
        'rgba(0, 0, 255, 0.6)',      // Mavi
        'rgba(255, 0, 0, 0.6)'       // Kırmızı
      ],
      borderColor: 'rgba(71, 73, 73, 0.6)',
      borderWidth: 1,
      hoverOffset: 30, // Adds a "pop out" effect when hovering
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
              // @ts-ignore
              const percentage = ((value / totalSales) * 100).toFixed(2);

              if (context.label === 'Son 16 Toplam') {
                // @ts-ignore
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
        });
      }
    }
  }
}
