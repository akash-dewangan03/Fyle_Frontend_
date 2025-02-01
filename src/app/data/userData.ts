import { User } from "../types/workoutTypes";

let userData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    workouts: [
      { type: 'Running', minutes: 30 },
      { type: 'Cycling', minutes: 45 }
    ],
    workoutCount: 2 
  },
  {
    id: 2,
    name: 'Jane Smith',
    workouts: [
      { type: 'Swimming', minutes: 60 },
      { type: 'Running', minutes: 20 }
    ],
    workoutCount: 2
  },
  {
    id: 3,
    name: 'Mike Johnson',
    workouts: [
      { type: 'Yoga', minutes: 50 },
      { type: 'Cycling', minutes: 40 }
    ],
    workoutCount: 2
  },
  {
    id: 4,
    name: 'Emily Davis',
    workouts: [
      { type: 'Hiking', minutes: 120 },
      { type: 'Swimming', minutes: 30 }
    ],
    workoutCount: 2
  },
  {
    id: 5,
    name: 'Chris Lee',
    workouts: [
      { type: 'Running', minutes: 25 },
      { type: 'Yoga', minutes: 45 }
    ],
    workoutCount: 2
  },
  {
    id: 6,
    name: 'Patricia Brown',
    workouts: [
      { type: 'Cycling', minutes: 55 },
      { type: 'Pilates', minutes: 35 }
    ],
    workoutCount: 2
  },
  {
    id: 7,
    name: 'James Wilson',
    workouts: [
      { type: 'Running', minutes: 50 },
      { type: 'Strength Training', minutes: 40 }
    ],
    workoutCount: 2
  },
  {
    id: 8,
    name: 'Linda Martinez',
    workouts: [
      { type: 'Yoga', minutes: 60 },
      { type: 'Cycling', minutes: 20 }
    ],
    workoutCount: 2
  },
  {
    id: 9,
    name: 'Robert Garcia',
    workouts: [
      { type: 'Swimming', minutes: 45 },
      { type: 'Running', minutes: 35 }
    ],
    workoutCount: 2
  },
  {
    id: 10,
    name: 'David Thompson',
    workouts: [
      { type: 'Hiking', minutes: 75 },
      { type: 'Cycling', minutes: 50 }
    ],
    workoutCount: 2
  },
  {
    id: 11,
    name: 'Susan White',
    workouts: [
      { type: 'Pilates', minutes: 30 },
      { type: 'Strength Training', minutes: 60 }
    ],
    workoutCount: 2
  },
  {
    id: 12,
    name: 'Thomas Anderson',
    workouts: [
      { type: 'Running', minutes: 40 },
      { type: 'Yoga', minutes: 50 }
    ],
    workoutCount: 2
  },
  {
    id: 13,
    name: 'Karen Harris',
    workouts: [
      { type: 'Cycling', minutes: 60 },
      { type: 'Swimming', minutes: 30 }
    ],
    workoutCount: 2
  },
  {
    id: 14,
    name: 'Mark Clark',
    workouts: [
      { type: 'Hiking', minutes: 90 },
      { type: 'Strength Training', minutes: 40 }
    ],
    workoutCount: 2
  },
  {
    id: 15,
    name: 'Jennifer Lewis',
    workouts: [
      { type: 'Yoga', minutes: 35 },
      { type: 'Cycling', minutes: 50 }
    ],
    workoutCount: 2
  }
];

// Setter function to update userData
export function setUserData(users: User[]): void {
  userData.length = 0; // Clear existing data
  userData.push(...users); // Replace with new data
}

export { userData };
