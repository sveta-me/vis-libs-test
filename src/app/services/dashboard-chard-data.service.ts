import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, interval, Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface ChartSeriesData {
  name: string;
  type: 'line' | 'scatter';
  data: number[] | [number, number][] | number [][];
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

  private readonly dataSubject = new BehaviorSubject<ChartData>(this.getInitialData());

  public readonly data$: Observable<ChartData> = this.dataSubject.asObservable();

    constructor() {
      interval(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateData();
        })
    }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateData(): void {
    const newSeries: ChartSeriesData[] = [

      // Линия 1
      {
        name: 'Линия 1',
        type: 'line',
        data: Array.from({ length: 100 }, (_, i) => 50 - i * 0.5 + Math.sin(i * 0.1) * 5),
        smooth: true,
        lineStyle: { color: '#FF7F50' },
        showSymbol: false
      },

      // Над линией 1
      {
        name: 'Над линией 1',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => ([
          i * 2 + 1,
          50 - i * 2 * 0.5 + Math.sin(i * 0.1) * 5 + Math.random() * 20
        ])),
        symbolSize: 6,
        itemStyle: { color: '#FF7F50' },
        symbol: 'triangle'
      },

      // Под линией 1
      {
        name: 'Под линией 1',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => ([
          i * 2 + 1,
          50 - i * 2 * 0.5 + Math.sin(i * 0.1) * 5 - Math.random() * 20
        ])),
        symbolSize: 6,
        itemStyle: { color: '#FF7F50' },
        symbol: 'triangle'
      },

      // Линия 2
      {
        name: 'Линия 2',
        type: 'line',
        data: Array.from({ length: 100 }, (_, i) => 20 + i * 0.5 + Math.cos(i * 0.1) * 5),
        smooth: true,
        lineStyle: { color: '#4682B4' },
        showSymbol: false
      },

      // Над линией 2
      {
        name: 'Над линией 2',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => ([
          i * 2 + 1,
          20 + i * 2 * 0.5 + Math.cos(i * 0.1) * 5 + Math.random() * 20
        ])),
        symbolSize: 6,
        itemStyle: { color: '#4682B4' },
        symbol: 'triangle'
      },

      // Под линией 2
      {
        name: 'Под линией 2',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => ([
          i * 2 + 1,
          20 + i * 2 * 0.5 + Math.cos(i * 0.1) * 5 - Math.random() * 20
        ])),
        symbolSize: 6,
        itemStyle: { color: '#4682B4' },
        symbol: 'triangle'
      }
    ];

    this.dataSubject.next({ series: newSeries });
  }

  private getInitialData(): ChartData {
  return {
    series: [
      // Линия 1
      {
        name: 'Линия 1',
        type: 'line',
        data: Array.from({ length: 100 }, (_, i) => 50 - i * 0.5),
        smooth: false,
        lineStyle: { color: '#FF7F50' },
        showSymbol: false
      },

      // Над линией 1
      {
        name: 'Над линией 1',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => [i * 2 + 1, 50 - i * 2 * 0.5 + Math.random() * 10]),
        symbolSize: 6,
        itemStyle: { color: '#FF7F50' }
      },

      // Под линией 1
      {
        name: 'Под линией 1',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => [i * 2 + 1, 50 - i * 2 * 0.5 - Math.random() * 10]),
        symbolSize: 6,
        itemStyle: { color: '#FF7F50' }
      },

      // Линия 2
      {
        name: 'Линия 2',
        type: 'line',
        data: Array.from({ length: 100 }, (_, i) => 20 + i * 0.5),
        smooth: false,
        lineStyle: { color: '#4682B4' },
        showSymbol: false
      },

      // Над линией 2
      {
        name: 'Над линией 2',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => [i * 2 + 1, 20 + i * 2 * 0.5 + Math.random() * 10]),
        symbolSize: 6,
        itemStyle: { color: '#4682B4' }
      },

      // Под линией 2
      {
        name: 'Под линией 2',
        type: 'scatter',
        data: Array.from({ length: 50 }, (_, i) => [i * 2 + 1, 20 + i * 2 * 0.5 - Math.random() * 10]),
        symbolSize: 6,
        itemStyle: { color: '#4682B4' }
      }
    ]
  };
}

}
