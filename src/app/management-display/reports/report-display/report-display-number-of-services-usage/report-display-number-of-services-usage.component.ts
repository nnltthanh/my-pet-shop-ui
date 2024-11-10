import { Component, effect, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { StatisticFilterPeriod, StatisticTimeData } from '../../../../services/statistic.service';

@Component({
    selector: 'app-report-display-number-of-services-usage',
    standalone: true,
    imports: [ChartModule],
    templateUrl: './report-display-number-of-services-usage.component.html',
    styleUrl: './report-display-number-of-services-usage.component.scss'
})
export class ReportDisplayNumberOfServicesUsageComponent {

    reportData = input<StatisticTimeData>();

    data: any;

    options: any;

    constructor() {
        effect(() => {
            this.buildChart();
        })
    }

    private buildChart() {
        if (this.reportData()) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            let labels: string[] = [];
            if (this.reportData()?.period === StatisticFilterPeriod.MONTH) {
                for (let index = 0; index < this.reportData()!.currentNumberOfOrders!.length; index++) {
                    labels.push(`Tuần ${index + 1}`);
                }
            } else if (this.reportData()?.period === StatisticFilterPeriod.YEAR) {
                for (let index = 0; index < 12; index++) {
                    labels.push(`Tháng ${index + 1}`);
                }
            } else if (this.reportData()?.period === StatisticFilterPeriod.WEEK) {
                labels = ["Ngày 1", "Ngày 2", "Ngày 3", "Ngày 4", "Ngày 5", "Ngày 6", "Ngày 7"];
            }

            this.data = {
                labels: labels,
                datasets: [
                    {
                        label: this.reportData()?.labels[0],
                        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                        borderColor: documentStyle.getPropertyValue('--blue-500'),
                        data: this.reportData()?.previousNumberOfServices,
                        tension: 0.4,
                    },
                    {
                        label: this.reportData()?.labels[1],
                        backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                        borderColor: documentStyle.getPropertyValue('--pink-500'),
                        data: this.reportData()?.currentNumberOfServices,
                        tension: 0.4,
                    }
                ]
            };

            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }

                }
            };
        }
    }

}
