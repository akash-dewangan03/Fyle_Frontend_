
export interface Workout {
    type: string;
    minutes: number;
}
export type User = {
    id: number;
    name: string;
    workouts: any[]; 
    workoutCount?: number;
};
  