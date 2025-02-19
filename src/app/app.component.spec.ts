import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './service/userService';
import { of } from 'rxjs';
import { User } from './types/workoutTypes';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let localStorageMock: { [key: string]: string }; // Added

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'setUsers', 'updateUser', 'addUser', 'deleteUser']); // Added Rest 3 Functions.

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    // Added Mock localStorage
    localStorageMock = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => localStorageMock[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => { localStorageMock[key] = value; });
    spyOn(localStorage, 'clear').and.callFake(() => { localStorageMock = {}; });
    
    userService.getUsers.and.returnValue(of([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }], workoutCount: 1 },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Cycling', minutes: 20 }], workoutCount: 1 }
    ]));

    component.userData$ = of([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }], workoutCount: 1 },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Cycling', minutes: 20 }], workoutCount: 1 }
    ]);

    fixture.detectChanges();
  });

  // Added
  it('should initialize with correct user data', () => {
    expect(component.filteredUsers.length).toBe(2);
  });

  it('should delete a user correctly', () => {
    component.deleteUser(1);
    expect(component.filteredUsers.length).toBe(1);
  });

  it('should handle deleting a user from an empty list', () => {
    component.userData = [];
    component.filteredUsers = [];
    component.deleteUser(1);
    expect(component.filteredUsers.length).toBe(0);
  });
  
  it('should reset form correctly', () => {
    component.name = 'Test';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;
    component.resetForm();
    expect(component.name).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull();
  });

  it('should filter users correctly', () => {
    component.nameFilter = 'John';
    component.filterUsers();
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].name).toBe('John Doe');
  });

  it('should clear filters correctly', () => {
    component.nameFilter = 'John';
    component.workoutTypeFilter = 'Running';
    component.clearFilters();
    expect(component.nameFilter).toBe('');
    expect(component.workoutTypeFilter).toBe('');
    expect(component.filteredUsers.length).toBe(2);
  });

  //Added
  it('should handle localStorage data correctly', () => {
    localStorageMock['userData'] = JSON.stringify([
      { id: 3, name: 'Alice', workouts: [{ type: 'Yoga', minutes: 40 }], workoutCount: 1 }
    ]);
    component.ngOnInit();
    expect(component.userData.length).toBe(1);
  });

  it('should handle invalid localStorage data gracefully', () => {
    localStorageMock['userData'] = 'invalid json';
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalled();
  });

  it('should reset localStorage correctly', () => {
    component.resetLocalStorage();
    expect(localStorageMock['userData']).toBeUndefined();
    expect(component.filteredUsers.length).toBe(0);
  });

  it('should calculate total user workout minutes correctly', () => {
    const user: User = { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }], workoutCount: 1 };
    expect(component.getTotalUserWorkoutMinutes(user)).toBe(30);
  });

  it('should return 0 if user has no workouts', () => {
    const user: User = { id: 2, name: 'Jane Doe', workouts: [], workoutCount: 0 };
    expect(component.getTotalUserWorkoutMinutes(user)).toBe(0);
  });

  it('should paginate users correctly', () => {
    component.itemsPerPage = 1;
    component.currentPage = 1;
    expect(component.paginatedUsers.length).toBe(1);
    component.nextPage();
    expect(component.currentPage).toBe(2);
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  //Added
  it('should not go to the next page if at last page', () => {
    component.itemsPerPage = 2;
    component.currentPage = 1;
    component.nextPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not go to previous page if at first page', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should add a new workout correctly', () => {
    component.name = 'Alice';
    component.workoutType = 'Yoga';
    component.workoutMinutes = 40;
    component.addWorkout();
    expect(component.userData.length).toBe(3);
  });

  it('should show an alert if workout input is invalid', () => {
    spyOn(window, 'alert');
    component.name = '';
    component.workoutType = 'Yoga';
    component.workoutMinutes = 40;
    component.addWorkout();
    expect(window.alert).toHaveBeenCalledWith('Please fill out all fields correctly!');
  });
});
