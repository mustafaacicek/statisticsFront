import { Component, OnInit } from '@angular/core';
import { Graph1ServiceService } from './graph1-service.service';
import { Chart } from 'chart.js';
import { drawDataLabels, functions } from "../../../../../../environment/functions";

interface MotorSales {
  marka: string;
  sayı: number;
}

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.scss']
})
export class Graph1Component implements OnInit {
  chart1: any;
  chart2: any;

  constructor(private motorSalesService: Graph1ServiceService) {}

  ngOnInit(): void {
    this.motorSalesService.getChart1part1().subscribe(
      data => this.createChart(data, 'motorSalesChart', 'İLK 24 FİRMA SATIŞLAR'),
      error => console.error('Error fetching motor sales data:', error)
    );
    this.motorSalesService.getChart1part2().subscribe(
      data => this.createChart(data, 'motorSalesChart2', 'İLK 24 FİRMA SATIŞLAR (Part 2)'),
      error => console.error('Error fetching motor sales data:', error)
    );
  }

  createChart(apiData: MotorSales[], chartId: string, title: string): void {
    const labels = apiData.map(sale => sale.marka);
    const data = apiData.map(sale => sale.sayı);
    const { month, year } = functions.getLastMonthAndYear(); // Mevcut ay ve yıl hesaplama

    if (chartId === 'motorSalesChart' && this.chart1) {
      this.chart1.destroy();
    } else if (chartId === 'motorSalesChart2' && this.chart2) {
      this.chart2.destroy();
    }

    const chart = new Chart(chartId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Satışlar',
            data: data,
            backgroundColor: 'rgba(96,132,209,0.8)',
            borderColor: 'rgba(75, 192, 192, 0.8)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `${title} - ${month} ${year}`,
            font: {
              size: 20,
              weight: 'bold',
            },
          },
          legend: {
            display: false,  // Legend'ı gizlemek için bu satırı ekleyin
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Satış Miktarı',
              font: {
                size: 14,
                weight: 'normal',
              },
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Marka',
              font: {
                size: 16,
                weight: 'normal',
              },
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
        },
        animation: {
          onProgress: () => {
            drawDataLabels(chart);
          },
        }
      },
    });

    if (chartId === 'motorSalesChart') {
      this.chart1 = chart;
    } else if (chartId === 'motorSalesChart2') {
      this.chart2 = chart;
    }
  }
}
