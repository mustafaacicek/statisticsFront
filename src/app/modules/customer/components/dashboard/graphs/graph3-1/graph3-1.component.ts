import {Component, OnInit} from '@angular/core';
import {Graph3serviceService} from "../graph3/graph3service.service";
import {Chart} from "chart.js";
import {Graph31serviceService} from "./graph31service.service";
import {drawDataLabels, functions} from "../../../../../../environment/functions";

@Component({
  selector: 'app-graph3-1',
  templateUrl: './graph3-1.component.html',
  styleUrl: './graph3-1.component.scss'
})

export class Graph31Component implements OnInit {

  constructor(private motorSalesService: Graph31serviceService) {}

  ngOnInit(): void {
    this.motorSalesService.getChart3a().subscribe(data => {
      this.createMotorSalesChart(data);
    });
  }
  createMotorSalesChart(apiData: any[]): void {
    const chartData = apiData;
    const { month, year } = functions.getLastMonthAndYear();
    const labels = chartData.map(brand => brand[0]);

    const dataset2023 = {
      label: '2024 Satışları',
      data: chartData.map(brand => brand[1]),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    };

    const dataset2024 = {
      label: '2023 Satışları',
      data: chartData.map(brand => brand[2]),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    };

    const chart = new Chart('motorSalesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [dataset2024, dataset2023]
      },
      options: {
        responsive: true,
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
            text: `İLK 8 FİRMANIN SON 2 YILDAKİ OCAK - ${month} SATIŞLARI (KUBA+RKS)`,
            font: {
              size: 20,
              weight: 'bold',
              family: 'Arial',
            },
          },
        },
        animation: {
          onProgress: () => {
            drawDataLabels(chart); // Animasyon ilerlerken etiketleri çizer
          },
        }
      }
    });
  }

}

