import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {Graph2serviceService} from "./graph2service.service";
import {drawDataLabels, drawDataLabels1, functions} from "../../../../../../environment/functions";

@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrl: './graph2.component.scss'
})
export class Graph2Component implements OnInit {
  chart: any;
  constructor(private motorSalesService: Graph2serviceService) {}

  ngOnInit(): void {
    this.motorSalesService.getChart2().subscribe(data => {
      this.createMotorSalesChart(data);
    });
  }

  createMotorSalesChart(apiData: any[]): void {
    const chartData = apiData;
    const labels = chartData.map(brand => brand.Marka);
    const { month } = functions.getLastMonthAndYear();

    const sales2022 = chartData.map(brand => {
      const yearSales = brand.yılSatışları.find(sales => sales['2022']);
      return yearSales ? yearSales['2022'] : 0;
    });

    const sales2023 = chartData.map(brand => {
      const yearSales = brand.yılSatışları.find(sales => sales['2023']);
      return yearSales ? yearSales['2023'] : 0;
    });

    const sales2024 = chartData.map(brand => {
      const yearSales = brand.yılSatışları.find(sales => sales['2024']);
      return yearSales ? yearSales['2024'] : 0;
    });

    this.chart = new Chart('motorSalesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '2022 Satışları',
            data: sales2022,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: '2023 Satışları',
            data: sales2023,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          },
          {
            label: '2024 Satışları',
            data: sales2024,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        animation: {
          onProgress: () => {
            drawDataLabels(this.chart); // Call the drawDataLabels function
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: 'Marka',
              font: {
                size: 16,
                weight: 'normal', // X ekseni başlığı için kalın font
              },
            },
            ticks: {
              maxRotation: 90,
              minRotation: 45,
              font: {
                size: 12,
                weight: 'bold', // X ekseni ölçüm değerleri için kalın font
              },
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Satış Sayısı',
              font: {
                size: 14,
                weight: 'normal', // Y ekseni başlığı için kalın font
              },
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold', // Y ekseni ölçüm değerleri için kalın font
              },
            }
          }
        },
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: true,
            text: `İLK 7 FİRMANIN SON 3 YILDAKİ ${month} AYI SATIŞLARI`,
            font: {
              size: 20,
              weight: 'bold',
              family: 'Arial',
            },
          },
        }
      }
    });
  }



}
