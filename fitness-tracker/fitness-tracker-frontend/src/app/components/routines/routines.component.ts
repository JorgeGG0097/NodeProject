import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    DatePipe
  ],
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {
  routines: any[] = [];
  exercises: any[] = [];
  goals: any[] = [];
  newRoutine = {
    duration: null,
    goal_id: null,
    sets: null,
    exercise_id: null,
    name: '',
    description: '',
    repetitions: null
  };
  selectedRoutine: any = {};
  isEditModalOpen: boolean = false;
  apiUrl = 'http://localhost:5000/api/routines';
  exerciseApiUrl = 'http://localhost:5000/api/exercises';
  goalApiUrl = 'http://localhost:5000/api/goals';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.getRoutines();
    this.getExercises();
    this.getGoals();
  }

  // GET all routines for the logged-in user
  getRoutines(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const userId = this.authService.getUserId();
      this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, { headers }).subscribe({
        next: (response) => (this.routines = response),
        error: (err) => alert('Failed to load routines'),
      });
    } else {
      console.log('No token found.');
    }
  }

  // GET all exercises
  getExercises(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any[]>(this.exerciseApiUrl, { headers }).subscribe({
        next: (response) => (this.exercises = response),
        error: (err) => alert('Failed to load exercises'),
      });
    }
  }

  // GET all goals
  getGoals(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any[]>(this.goalApiUrl, { headers }).subscribe({
        next: (response) => (this.goals = response),
        error: (err) => alert('Failed to load goals'),
      });
    }
  }

  // POST: Create new routine
  createRoutine(): void {
    const token = this.authService.getToken();
    if (token) {
      const userId = this.authService.getUserId();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const routineData = {
        ...this.newRoutine,
        user_id: userId,
      };
      this.http.post<any>(`${this.apiUrl}/create`, routineData, { headers }).subscribe({
        next: (response) => {
          this.routines.push(response);
          this.newRoutine = {
            name: '',
            description: '',
            exercise_id: null,
            goal_id: null,
            sets: null,
            repetitions: null,
            duration: null
          };
        },
        error: (err) => alert('Failed to create routine'),
      });
    }
  }

  // PUT: Update routine
  updateRoutine(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(`${this.apiUrl}/${this.selectedRoutine.id}`, this.selectedRoutine, { headers }).subscribe({
        next: () => {
          alert('Routine updated successfully');
          this.closeEditModal();
          this.getRoutines();
        },
        error: (err) => alert('Failed to update routine'),
      });
    }
  }

  // DELETE: Delete routine
  deleteRoutine(id: number): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe({
        next: () => {
          this.routines = this.routines.filter((routine) => routine.id !== id);
        },
        error: (err) => alert('Failed to delete routine'),
      });
    }
  }

  // Open edit modal
  openEditModal(routine: any) {
    this.selectedRoutine = { ...routine };
    this.isEditModalOpen = true;
  }

  // Close edit modal
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedRoutine = {};
  }

  getExerciseName(exerciseId: number): string {
    const exercise = this.exercises.find(ex => ex.id === exerciseId);
    return exercise ? exercise.name : 'Unknown Exercise';
  }

  getGoalName(goalId: number): string {
    const goal = this.goals.find(g => g.id === goalId);
    return goal ? goal.name : 'Unknown Goal';
  }

}
