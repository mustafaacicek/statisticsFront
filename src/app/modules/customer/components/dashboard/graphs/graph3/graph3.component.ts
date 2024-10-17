import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Graph3serviceService } from './graph3service.service';
import { drawDataLabels, functions } from '../../../../../../environment/functions';

@Component({
  selector: 'app-graph3',
  templateUrl: './graph3.component.html',
  styleUrls: ['./graph3.component.scss']
})
export class Graph3Component implements OnInit {


  chartPart1: Chart | null = null;
  chartPart2: Chart | null = null;
  chartPart3: Chart | null = null;
  constructor(private motorSalesService: Graph3serviceService) {}

  ngOnInit(): void {
    this.motorSalesService.getChart3().subscribe(data => {
      this.createMotorSalesChart(data);
    });
    this.motorSalesService.getChart3part2().subscribe(data1 => {
      this.createMotorSalesChartPart2(data1);
    });
    this.motorSalesService.getChart3part3().subscribe(data2 => {
      this.createMotorSalesChartPart3(data2);
    });
  }

  createMotorSalesChart(apiData: any[]): void {
    this.createChart('motorSalesChart', apiData, 'İLK 26 FİRMANIN SON 2 YILDAKİ OCAK', 'part1');
  }

  createMotorSalesChartPart2(apiData: any[]): void {
    this.createChart('motorSalesChartPart2', apiData, 'İLK 26 FİRMANIN SON 2 YILDAKİ OCAK', 'part2');
  }

  createMotorSalesChartPart3(apiData: any[]): void {
    this.createChart('motorSalesChartPart3', apiData, 'İLK 26 FİRMANIN SON 2 YILDAKİ OCAK', 'part3');
  }

  private createChart(chartId: string, apiData: any[], title: string, part: string): void {
    const chartData = apiData;
    const { month } = functions.getLastMonthAndYear();
    const labels = chartData.map(brand => brand[0]);

    const dataset2024 = {
      label: '2024 Satışları',
      data: chartData.map(brand => brand[1]),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };

    const dataset2023 = {
      label: '2023 Satışları',
      data: chartData.map(brand => brand[2]),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    };

    // Eski grafiği yok et (varsa)
    if (this[`chart${part}`]) {
      this[`chart${part}`]?.destroy();
    }

    this[`chart${part}`] = new Chart(chartId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [dataset2023, dataset2024]
      },
      options: {
        responsive: true,
        animation: {
          onProgress: () => {
            drawDataLabels(this[`chart${part}`]);
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
                size: 14,
                weight: 'normal', // X ekseni başlığı için kalın font
              },
            },
            ticks: {
              autoSkip: false,
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
            text: `${title} - ${month} SATIŞLARI`,
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
