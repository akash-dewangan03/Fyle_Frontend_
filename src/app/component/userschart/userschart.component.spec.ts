import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserschartComponent } from './userschart.component';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/userService';
import { of } from 'rxjs';
import { Workout } from '../../types/workoutTypes'; 
import { Chart } from 'chart.js'; 

// Mock the UserService to provide sample data
class MockUserService {
  getUsers() {
    return of([
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Swimming', minutes: 45 }
        ] as Workout[] ,
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Cycling', minutes: 60 },
          { type: 'Yoga', minutes: 40 }
        ] as Workout[],
      },
      {
        id: 3,
        name: 'Jack Johnson',
        workouts: [
          { type: 'Running', minutes: 50 },
          { type: 'Yoga', minutes: 20 }
        ] as Workout[],
      }
    ]);
  }
}

describe('UserschartComponent', () => {
  let component: UserschartComponent;
  let fixture: ComponentFixture<UserschartComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, UserschartComponent, BaseChartDirective],
      providers: [{ provide: UserService, useClass: MockUserService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserschartComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();

    // Ensure firstThreeUsers is populated with mock data
    component.firstThreeUsers = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Cycling', minutes: 60 }] },
      { id: 3, name: 'Jack Johnson', workouts: [{ type: 'Yoga', minutes: 20 }] },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize firstThreeUsers and call updateChartData in ngOnInit', () => {
    spyOn(component, 'updateChartData');
    component.ngOnInit();
    expect(component.firstThreeUsers.length).toBe(3);
    expect(component.updateChartData).toHaveBeenCalledWith(1);
  });

  it('should update chart data correctly', () => {
    component.updateChartData(1);
    expect(component.userDetails.name).toBe('John Doe');
    expect((component.data.labels ?? []).length).toBeGreaterThan(0);
  });

  it('should handle missing user gracefully', () => {
    component.updateChartData(999);
    expect(component.userDetails.name).toBe('');
    expect(component.data.labels?.length).toBe(0);
  });

  it('should log a warning for invalid workout data', () => {
    spyOn(console, 'warn');
    
    // Create an invalid user with missing workout fields
    const invalidUser = {
      id: 4,
      name: 'Invalid User',
      workouts: [
        { type: '', minutes: 30 },
        { type: 'Running', minutes: null },  
      ],
    };

    // Add the invalid user to the list of users
    component.firstThreeUsers.push(invalidUser);

    // Call updateChartData to trigger the warning
    component.updateChartData(4);

    // Check that the warning was logged
    expect(console.warn).toHaveBeenCalledWith('Missing workout data: Please provide all fields.');
  });

  it('should update chart when chart data changes', () => {
    spyOn(component.chart?.chart as Chart, 'update');
    component.updateChartData(1);
    expect((component.chart?.chart as Chart).update).toHaveBeenCalled();
  });
});
