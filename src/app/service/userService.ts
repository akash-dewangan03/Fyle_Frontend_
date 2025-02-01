import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../types/workoutTypes';
import { userData, setUserData } from '../data/userData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers(): Observable<User[]> {
    return of(userData);
  }

  getUserById(userId: number): Observable<User | undefined> {
    return of(userData.find(u => u.id === userId));
  }

  addUser(user: User): void {
    userData.push(user);
  }
  
  updateUser(updatedUser: User): void {
    const updatedUsers = userData.map(user => 
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    setUserData(updatedUsers);
  }
  
  
  deleteUser(userId: number): void {
    const updatedUsers = userData.filter(user => user.id !== userId);
    setUserData(updatedUsers);
  }

  setUsers(users: User[]): void {
    setUserData(users);
  }
}
