import { TestBed } from '@angular/core/testing';
import { UserService } from './userService';
import { User } from '../types/workoutTypes';
import { userData } from '../data/userData';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all users when getUsers is called', (done) => {
    service.getUsers().subscribe((users: User[]) => {
      expect(users).toEqual(userData);
      done();
    });
  });

  it('should return a specific user by ID', (done) => {
    const userId = 1;
    service.getUserById(userId).subscribe((user: User | undefined) => {
      const expectedUser = userData.find(u => u.id === userId);
      expect(user).toEqual(expectedUser);
      done();
    });
  });

  it('should add a new user', () => {
    const newUser: User = {
      id: 16,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ],
      workoutCount: 2
    };
    service.addUser(newUser);

    const user = userData.find(u => u.id === newUser.id);
    expect(user).toEqual(newUser);
  });

  it('should update an existing user', () => {
    const updatedUser: User = {
      id: 1,
      name: 'Updated Name',
      workouts: [
        { type: 'Running', minutes: 40 },
        { type: 'Cycling', minutes: 50 }
      ],
      workoutCount: 2
    };
    service.updateUser(updatedUser);

    const user = userData.find(u => u.id === updatedUser.id);
    expect(user).toEqual(updatedUser);
  });

  it('should delete a user by ID', () => {
    const userIdToDelete = 1;
    service.deleteUser(userIdToDelete);

    const user = userData.find(u => u.id === userIdToDelete);
    expect(user).toBeUndefined();
  });

  it('should set users correctly', () => {
    const newUsers: User[] = [
      { id: 101, name: 'Alice', workouts: [], workoutCount: 0 },
      { id: 102, name: 'Bob', workouts: [], workoutCount: 0 }
    ];
    
    service.setUsers(newUsers);
    
    expect(userData.length).toBe(newUsers.length);
    expect(userData).toEqual(newUsers);
  });
});
