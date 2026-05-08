import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, interval, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface ChartSeriesData {
  name: string;
  type: 'line' | 'scatter';
  data: number[] | [number, number][];
  [key: string]: any;
}

export interface ChartData {
  series: ChartSeriesData[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardChartDataService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly dataSubject = new BehaviorSubject<ChartData>(this.getInitialData(100, 20));

  public readonly data$: Observable<ChartData> = this.dataSubject.asObservable();

    constructor() {
      interval(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateData(100, 20);
        })
    }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateData(linePoints: number, scatterPoints: number): void {
    const newSeries: ChartSeriesData[] = [

      // Линия 1
      {
        name: 'Линия 1',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 50 - i * 0.5 + Math.sin(i * 0.1) * 5),
        smooth: true,
        lineStyle: { color: '#FF7F50' },
        showSymbol: false
      },

      // Точки вокруг линии 1
      {
        name: 'Точки вокруг линии 1',
        type: 'scatter',
        data: Array.from({ length: scatterPoints }, (_, i): [number, number] => {
          const x = 1 + i * 99 / (scatterPoints - 1);
          const base = 50 - x * 0.5 + Math.sin(x * 0.1) * 5;
          const offset = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 20;
          return [x, base + offset];
        }),
        symbolSize: 6,
        itemStyle: { color: '#FF7F50' },
        symbol: 'triangle'
      },

      // Линия 2
      {
        name: 'Линия 2',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 20 + i * 0.5 + Math.cos(i * 0.1) * 5),
        smooth: true,
        lineStyle: { color: '#4682B4' },
        showSymbol: false
      },

      // Точки вокруг линии 2
      {
        name: 'Точки вокруг линии 2',
        type: 'scatter',
        data: Array.from({ length: scatterPoints }, (_, i): [number, number] => {
          const x = 1 + i * 99 / (scatterPoints - 1);
          const base = 20 + x * 0.5 + Math.cos(x * 0.1) * 5;
          const offset = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 20;
          return [x, base + offset];
        }),
        symbolSize: 6,
        itemStyle: { color: '#4682B4' },
        symbol: 'triangle'
      },
      // Линия 3
      {
        name: 'Линия 3',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 20 + i * 0.5 + Math.cos(i * 0.1) * 7),
        smooth: true,
        lineStyle: { color: '#1ec00f' , type: "dashed"},
        showSymbol: false
      },
      // Линия 4
      {
        name: 'Линия 4',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 50 - i * 0.5 + Math.sin(i * 0.1) * 7),
        smooth: true,
        lineStyle: { color: '#9d00a0' , type: "dashed"},
        showSymbol: false
      },
    ];

    this.dataSubject.next({ series: newSeries });
  }

  private getInitialData(linePoints: number, scatterPoints: number): ChartData {
  return {
    series: [
      // Линия 1
      {
        name: 'Линия 1',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 50 - i * 0.5),
        smooth: false,
        lineStyle: { color: '#FF7F50' },
        showSymbol: false
      },

      // Точки вокруг линии 1
      {
        name: 'Точки вокруг линии 1',
        type: 'scatter',
        data: Array.from({ length: scatterPoints }, (_, i): [number, number] => {
          const x = 1 + i * 99 / (scatterPoints - 1);
          const base = 50 - x * 0.5;
          const offset = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10;
          return [x, base + offset];
        }),
        symbolSize: 6,
        itemStyle: { color: '#FF7F50' }
      },

      // Линия 2
      {
        name: 'Линия 2',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 20 + i * 0.5),
        smooth: false,
        lineStyle: { color: '#4682B4' },
        showSymbol: false
      },

      // Точки вокруг линии 2
      {
        name: 'Точки вокруг линии 2',
        type: 'scatter',
        data: Array.from({ length: scatterPoints }, (_, i): [number, number] => {
          const x = 1 + i * 99 / (scatterPoints - 1);
          const base = 20 + x * 0.5;
          const offset = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10;
          return [x, base + offset];
        }),
        symbolSize: 6,
        itemStyle: { color: '#4682B4' }
      },
      // Линия 3
      {
        name: 'Линия 3',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 20 + i * 0.5 + Math.cos(i * 0.1) * 7),
        smooth: true,
        lineStyle: { color: '#1ec00f' , type: "dashed"},
        showSymbol: false
      },
      // Линия 4
      {
        name: 'Линия 4',
        type: 'line',
        data: Array.from({ length: linePoints }, (_, i) => 50 - i * 0.5 + Math.sin(i * 0.1) * 7),
        smooth: true,
        lineStyle: { color: '#9d00a0' , type: "dashed"},
        showSymbol: false
      },
    ]
  };
}

}
