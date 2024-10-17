import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { BrandSalesServiceService } from './brand-sales-service.service';
import {drawDataLabels} from "../../../../../environment/functions";

@Component({
  selector: 'app-brand-sales',
  templateUrl: './brand-sales.component.html',
  styleUrls: ['./brand-sales.component.scss']
})



export class BrandSalesComponent implements OnInit {
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  brandSalesData: any[] = [];
  private chart: Chart | undefined;

  constructor(
    private route: ActivatedRoute,
    private motorService: BrandSalesServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedYear = +params.get('year')!;
      this.selectedMonth = +params.get('month')!;
      this.fetchBrandSalesData();
    });
  }

  fetchBrandSalesData(): void {
    if (this.selectedYear && this.selectedMonth) {
      this.motorService.getBrandSalesByMonth(this.selectedYear, this.selectedMonth).subscribe(
        data => {
          this.brandSalesData = data;
          this.createChart();
        },
        error => {
          console.error('Error fetching brand sales data:', error);
        }
      );
    }
  }

  getMonthName(monthNumber: number): string {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return months[monthNumber - 1];
  }

  createChart(): void {
    const labels = this.brandSalesData.map(sale => sale.marka);
    const data = this.brandSalesData.map(sale => sale.sayi);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('brandSalesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Marka Satışları - ${this.selectedYear}/${this.getMonthName(this.selectedMonth)}`,
          data: data,
          backgroundColor: 'rgba(184,173,207,0.9)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { weight: 'bold', size: 14 }
            }
          },
          x: {
            ticks: {
              font: { weight: 'bold' }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Marka Satış Verileri - ${this.selectedYear}/${this.getMonthName(this.selectedMonth)}`,
            font: {
              size: 20,
              weight: 'bold',
              family: 'Arial',
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          legend: {
            display: false ,
          }
        },
        animation: {
          duration: 1000, // Animasyon süresi (milisaniye)
          easing: 'easeInOutQuad', // Animasyon türü
          onProgress: () => {

            drawDataLabels(this.chart);
          },
        }
      }
    });
  }
}
