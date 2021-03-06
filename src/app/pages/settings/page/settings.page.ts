import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
})
export class SettingsPage implements OnInit {
  chart;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: ['x', 'y', 'z', 'w', 'a', 'b', 'c'],
        datasets: [
          {
            data: [10, 12, 8, 15, 18, 9, 50, 8],
            borderColor: '#3cba9f',
            backgroundColor: [
              '#3cb371',
              '#0000FF',
              '#9966FF',
              '#4C4CFF',
              '#00FFFF',
              '#f990a7',
              '#aad2ed',
              '#FF00FF',
              'Blue',
              'Red',
              'Blue',
            ],
            fill: false,
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
            },
          ],
        },
      },
    });
  }

  goToUserConfiguration() {
    this.router.navigate(['user-management']);
  }
}
