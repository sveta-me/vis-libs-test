import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ChartData, ChartSeriesData, DashboardChartDataService } from 'src/app/services/dashboard-chard-data.service';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-echarts-data-chart',
  templateUrl: './echarts-data-chart.component.html',
  styleUrls: ['./echarts-data-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EchartsDataChartComponent implements OnInit, OnDestroy {

  private chartInstance: echarts.ECharts | null = null;

  private destroy$ = new Subject<void>();

  constructor(private chartDataService: DashboardChartDataService) {}

  ngOnInit(): void {
    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    this.chartInstance = myChart;

    this.chartDataService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChartData) => this.updateChart(data));
  }

  private updateChart(data: ChartData): void {
    if (!this.chartInstance) return;

    const option: EChartsOption = {
      tooltip: { trigger: 'axis' },
      legend: {
        data: data.series.map((s: ChartSeriesData) => s.name),
        top: 'bottom'
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 100 }, (_, i: number) => i + 1),
        axisLabel: { interval: 0 }
      },
      yAxis: { type: 'value' },
      series: data.series
    };

    this.chartInstance.setOption(option);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }
}


