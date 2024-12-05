import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StatisticFilterPeriod, StatisticFilterPeriodMeaning, StatisticOverview, StatisticService, StatisticTimeData } from '../../../services/statistic.service';
import { ReportDisplayNumberOfOrdersComponent } from './report-display-number-of-orders/report-display-number-of-orders.component';
import { ReportDisplayNumberOfProductsComponent } from './report-display-number-of-products/report-display-number-of-products.component';
import { ReportDisplayNumberOfServicesUsageComponent } from './report-display-number-of-services-usage/report-display-number-of-services-usage.component';
import { ReportDisplayRevenueComponent } from './report-display-revenue/report-display-revenue.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-display',
  standalone: true,
  imports: [
    CurrencyPipe,
    ReportDisplayNumberOfOrdersComponent,
    ReportDisplayNumberOfProductsComponent,
    ReportDisplayNumberOfServicesUsageComponent,
    ReportDisplayRevenueComponent,
    AsyncPipe,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './report-display.component.html',
  styleUrl: './report-display.component.scss',
})
export class ReportDisplayComponent {

  numberOfOrdersOfMonth: number = 0;

  revenueOfMonth: number = 0;

  numberOfProductsOfMonth: number = 0;

  numberOfServiceProductsOfMonth: number = 0;

  statisticService = inject(StatisticService);

  isChecked: Observable<StatisticOverview>;

  selectedFilter: StatisticFilterPeriod = StatisticFilterPeriod.MONTH;

  reportData: StatisticTimeData;

  readonly filters = Object.values(StatisticFilterPeriod);

  readonly StatisticFilterPeriodMeaning = StatisticFilterPeriodMeaning;

  ngOnInit(): void {
    this.isChecked = this.statisticService.findStatisticOverviewInCurrentMonth()
    .pipe(map((data) => {
      if (data) {
        this.numberOfOrdersOfMonth = data.numberOfOrdersOfMonth;
        this.revenueOfMonth = data.revenueOfMonth;
        this.numberOfProductsOfMonth = data.numberOfProductsOfMonth;
        this.numberOfServiceProductsOfMonth = data.numberOfServiceProductsOfMonth;
      }
      return data;
    }))

    this.onFilter(this.selectedFilter);
  }

  onFilter(period: StatisticFilterPeriod) {
    this.selectedFilter = period;
    this.statisticService.findStatisticOverviewByFilter(this.selectedFilter).subscribe({
      next: (data: StatisticTimeData) => {
        this.reportData = data;

        if (period === StatisticFilterPeriod.MONTH) {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
          const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
          
          this.reportData.labels = [`Tháng ${lastMonth}`, `Tháng ${currentMonth}`];
        }

        if (period === StatisticFilterPeriod.YEAR) {
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const lastYear = currentYear - 1;
          
          this.reportData.labels = [`Năm ${lastYear}`, `Năm ${currentYear}`];
        }

        if (period === StatisticFilterPeriod.WEEK) {
          this.reportData.labels = ["Tuần trước", "Tuần này"];
        }

      }
    })
  }

  export() {
    this.statisticService.export(this.selectedFilter).subscribe(data => {
      const currentDate = new Date();

      // Get the date part in dd-MM-yyyy format
      const formattedDate = currentDate.toLocaleDateString('en-GB');

      // Get the time part in HH:mm:ss format (24-hour format)
      const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });

      // Combine the date and time
      const dateTimeString = `${formattedDate}-${formattedTime}`;

      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'reports_' + this.selectedFilter + '_' + dateTimeString;
      link.href = blobUrl;
      link.click();
      URL.revokeObjectURL(blobUrl);
  })
  }

}
