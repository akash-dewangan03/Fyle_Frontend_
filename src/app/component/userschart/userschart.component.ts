import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserService } from '../../service/userService';
import { Workout } from '../../types/workoutTypes';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

@Component({
  selector: 'app-userschart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './userschart.component.html',
  styleUrls: ['./userschart.component.css'],
})
export class UserschartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  data: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Workout Type',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Minutes',
        },
        beginAtZero: true,
      },
    },
  };

  userDetails: { name: string; workouts: { type: string; minutes: number }[] } = { name: '', workouts: [] };
  firstThreeUsers: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.firstThreeUsers = users.slice(0, 3);
      this.updateChartData(1); // Default userId set to 1
    });
  }

  updateChartData(userId: number): void {
    const selectedUser = this.firstThreeUsers.find((user) => user.id === userId);

    if (selectedUser) {
      this.userDetails = { name: selectedUser.name, workouts: selectedUser.workouts };

      const workoutMap: { [key: string]: number } = {};
      selectedUser.workouts.forEach((workout: Workout) => {
        if (!workout.type || workout.minutes === null || workout.minutes === undefined) {
          console.warn('Missing workout data: Please provide all fields.');
          return;
        }
        workoutMap[workout.type] = (workoutMap[workout.type] || 0) + workout.minutes;
      });

      this.data.labels = Object.keys(workoutMap);
      this.data.datasets = [
        {
          data: Object.values(workoutMap),
          label: `${selectedUser.name}'s Workout Progess`,
          backgroundColor: 'rgb(165, 236, 234)',
          borderColor: 'rgb(165, 236, 234)',
          borderWidth: 1,
        },
      ];
    } else {
      this.userDetails = { name: '', workouts: [] };
      this.data.labels = [];
      this.data.datasets = [];
    }

    if (this.chart?.chart) {
      this.chart.chart.update();
    }
  }
}
