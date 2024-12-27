import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

interface Goal {
  id: number;
  name: string;
  description: string;
  targetdate: string;
}

@Component({
  selector: 'app-highcharts-goals',
  standalone: true,
  templateUrl: './highcharts-goals.component.html',
  styleUrls: ['./highcharts-goals.component.css'],
  imports: [HighchartsChartModule],
})
export class HighchartsGoalsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Goals Per Month',
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Month',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Goals',
      },
    },
    series: [
      {
        type: 'column',
        name: 'Goals',
        data: [],
      },
    ],
    credits: {
      enabled: false,
    },
  };
  private chartRef!: Highcharts.Chart | null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const url = 'http://localhost:5000/api/goals';
      this.http.get<Goal[]>(url, { headers }).subscribe({
        next: (response) => {
          const groupedData = this.groupGoalsByMonth(response);
          this.updateChart(groupedData);
        },
        error: (err) => {
          console.error('Error loading data:', err);
        },
      });
    }
  }

  groupGoalsByMonth(goals: Goal[]): { month: string; count: number }[] {
    const monthMap = new Map<string, number>();

    goals.forEach((goal) => {
      if (goal.targetdate) {
        const date = new Date(goal.targetdate);
        const monthName = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(date);

        monthMap.set(monthName, (monthMap.get(monthName) || 0) + 1);
      }
    });

    const sortedMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return Array.from(monthMap.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => {
        const aIndex = sortedMonths.findIndex((m) => a.month.includes(m));
        const bIndex = sortedMonths.findIndex((m) => b.month.includes(m));
        return aIndex - bIndex;
      });
  }

  updateChart(data: { month: string; count: number }[]): void {
    if (!this.chartRef) {
      const chartContainer = document.getElementById('highcharts-container');
      if (chartContainer) {
        this.chartRef = Highcharts.chart('highcharts-container', this.chartOptions);
      }
    }

    if (this.chartRef) {
      this.chartRef.xAxis[0].setCategories(data.map((item) => item.month));
      this.chartRef.series[0].setData(data.map((item) => item.count));
    }
  }
}
