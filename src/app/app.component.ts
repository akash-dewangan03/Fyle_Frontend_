import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './service/userService'; 
import { User, Workout } from './types/workoutTypes';
import { UserschartComponent } from './component/userschart/userschart.component';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, BaseChartDirective, UserschartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent implements OnInit {
  title = 'Health Challenge Tracker';

  userData: User[] = [];  
  userData$: Observable<User[]> = of([]);

  name = '';
  workoutType: string = ''; 
  workoutTypeFilter: string = '';
  workoutMinutes: number | null = null;
  nameFilter = '';
  filteredUsers: User[] = [];
  workoutTypes: string[] = ['Cycling', 'Swimming', 'Yoga', 'Running', 'Hiking', 'Pilates', 'Strength Training'];

  constructor(private userService: UserService) {  
    this.filteredUsers = this.userData.slice();
  }

  ngOnInit() {
    // Fetch user data from UserService
    this.userService.getUsers().subscribe((data: User[]) => {
      this.userData = data;
      this.filteredUsers = [...this.userData]; 
    });

    // You may still want to load data from localStorage if there's any saved data
    const data = localStorage.getItem('userData');
    if (data) {
      try {
        const savedData = JSON.parse(data);
        if (Array.isArray(savedData)) {
          this.userData = savedData;
          this.filteredUsers = this.userData.slice();
        } else {
          console.error("Invalid data structure in localStorage");
        }
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      }
    }
  }

  addWorkout() {
    if (!this.name.trim() || !this.workoutType || this.workoutMinutes === null || this.workoutMinutes <= 0) {
      alert("Please fill out all fields correctly!");
      return;
    }

    const newWorkout: User = {
      id: this.userData.length + 1,
      name: this.name,
      workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }],
      workoutCount: 1
    };

    const existingUser = this.userData.find(user => user.name === this.name);
    if (existingUser) {
      existingUser.workouts.push({ type: this.workoutType, minutes: this.workoutMinutes });
      existingUser.workoutCount = existingUser.workouts.length;
    } else {
      this.userData.push(newWorkout);
    }

    this.saveToLocalStorage();
    this.resetForm();
    this.filterUsers();
  }

  deleteUser(userId: number) { 
    this.userData = this.userData.filter(user => user.id !== userId);
    this.filteredUsers = this.userData.slice();
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  resetLocalStorage() {
    localStorage.clear();
    this.userService.setUsers([]);  
    this.filteredUsers = [];
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.workoutType = '';  
    this.workoutMinutes = null;
  }

  filterUsers() {
    this.filteredUsers = this.userData.filter(user =>
      user.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      (!this.workoutTypeFilter || user.workouts.some((workout: Workout) => workout.type === this.workoutTypeFilter))
    );
    this.currentPage = 1; // Reset to page 1 after filtering
  }

  clearFilters() {
    this.nameFilter = '';
    this.workoutTypeFilter = '';
    this.filteredUsers = this.userData.slice();
  }

  currentPage = 1;
  itemsPerPage = 5;

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  getTotalUserWorkoutMinutes(user: User): number {
    if (!user.workouts || user.workouts.length === 0) {
      return 0;
    }
    return user.workouts.reduce((total: number, workout: Workout) => total + workout.minutes, 0);
  }
}
