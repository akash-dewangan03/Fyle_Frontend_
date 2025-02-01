import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './service/userService';
import { of } from 'rxjs';
import { User } from './types/workoutTypes';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'setUsers', 'updateUser', 'addUser', 'deleteUser']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

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

  it('should delete a user correctly', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }], workoutCount: 1 },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Cycling', minutes: 20 }], workoutCount: 1 }
    ];

    userService.getUsers.and.returnValue(of(mockUsers));
    userService.setUsers.and.stub();

    component.deleteUser(1);

    expect(userService.setUsers).toHaveBeenCalledWith([
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Cycling', minutes: 20 }], workoutCount: 1 }
    ]);
    expect(component.filteredUsers.length).toBe(1);
  });

  it('should initialize with correct user data', () => {
    expect(component.filteredUsers.length).toBe(2);
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

  it('should paginate users correctly', () => {
    component.itemsPerPage = 1;
    component.currentPage = 1;
    expect(component.paginatedUsers.length).toBe(1);
    component.nextPage();
    expect(component.currentPage).toBe(2);
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });
});
