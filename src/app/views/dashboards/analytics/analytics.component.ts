import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { StatisticsComponent } from './components/statistics/statistics.component'
import { SalesChartComponent } from './components/sales-chart/sales-chart.component'
import { TransactionComponent } from './components/transaction/transaction.component'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    PageTitleComponent,
    StatisticsComponent,
    SalesChartComponent,
    TransactionComponent,
    NgApexchartsModule
  ],
  templateUrl: './analytics.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnalyticsComponent {


}
