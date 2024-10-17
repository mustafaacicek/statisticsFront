export const functions = {


  drawDataLabels(): void {
    const ctx = this.chart.ctx;
    ctx.font = 'bold 14px Arial'; // Font ve boyut
    ctx.fillStyle = '#FFFFFF'; // Yazı rengi (beyaz)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    this.chart.data.datasets[0].data.forEach((value: number, index: number) => {
      const bar = this.chart.getDatasetMeta(0).data[index];
      const x = bar.x; // Barın x konumu
      const y = bar.y; // Barın y konumu
      const formattedValue = value.toLocaleString(); // Sayıyı formatla

      // Yazıyı arka plana koymak için bir dikdörtgen çizebiliriz
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Arka plan rengi (yarı şeffaf siyah)
      const textWidth = ctx.measureText(formattedValue).width;
      ctx.fillRect(x - textWidth / 2 - 5, y - 28, textWidth + 10, 20); // Arka plan dikdörtgeni

      ctx.fillStyle = '#FFFFFF'; // Yazı rengi (beyaz)
      ctx.fillText(formattedValue, x, y - 10); // Barların üstünde yazdır
    });
  },


  getLastMonthAndYear(): { month: string; year: number } {
    const now = new Date();
    let lastMonthDate: Date;

    if (now.getDate() > 20) {
      lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1); // Bir önceki ay
    } else {
      lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 2); // İki ay önce
    }

    const month = lastMonthDate.toLocaleString('default', { month: 'long' }).toUpperCase(); // Ay ismi
    const year = lastMonthDate.getFullYear(); // Yıl
    return { month, year };
  },

};

export function drawDataLabels(chart: any): void {
  const ctx = chart.ctx;
  ctx.font = 'bold 12px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
    dataset.data.forEach((value: number, index: number) => {
      const bar = chart.getDatasetMeta(datasetIndex).data[index];
      const x = bar.x;
      const y = bar.y;
      const formattedValue = value.toLocaleString();

      ctx.fillStyle = 'rgba(55,54,54,0.8)';
      const textWidth = ctx.measureText(formattedValue).width;

      ctx.fillRect(x - textWidth / 2 - 5, y - 45, textWidth + 10, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(formattedValue, x, y - 34); // Y koordinatı ayarlandı
    });
  });
}



export function drawDataLabels1(chart: any): void {
  const ctx = chart.ctx;
  ctx.font = 'bold 14px Arial';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
    dataset.data.forEach((value: number, index: number) => {
      const bar = chart.getDatasetMeta(datasetIndex).data[index];
      const x = bar.x;
      const y = bar.y;
      const formattedValue = value.toLocaleString();

      // Draw background for the text
      ctx.fillStyle = 'rgba(55,54,54,0.7)';
      const textWidth = ctx.measureText(formattedValue).width;
      ctx.fillRect(x - textWidth / 2 - 5, y - 45, textWidth + 10, 20);

      // Draw text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(formattedValue, x, y - 34);
    });
  });
}
