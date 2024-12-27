import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../../auth.service';
import {FormsModule} from '@angular/forms';
import {AgGridGoalsComponent} from '../ag-grid-goals/ag-grid-goals.component';
import {HighchartsGoalsComponent} from '../highcharts-goals/highcharts-goals.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    DatePipe,
    AgGridGoalsComponent,
    HighchartsGoalsComponent
  ],
  styleUrl: './goals.component.css'
})
export class GoalsComponent implements OnInit {
  goals: any[] = [];
  newGoal = { name: '', description: '', targetDate: '' };
  isEditModalOpen: boolean = false;
  selectedGoal: any = {};
  apiUrl = 'http://localhost:5000/api/goals';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGoals();
  }


  // GET
  getGoals(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
        next: (response) => (this.goals = response),
        error: (err) => alert('Failed to load goals'),
      });
    } else {
      console.log('No token found.');
    }
  }

  // POST
  createGoal(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post<any>(`${this.apiUrl}/create`, this.newGoal, { headers }).subscribe({
        next: (response) => {
          this.goals.push(response); // Add to the list
          this.newGoal = { name: '', description: '', targetDate: '' }; // Clear the form
        },
        error: (err) => alert('Failed to create goal'),
      });
    }
  }

  openEditModal(goal: any) {
    this.selectedGoal = { ...goal }; // Clone the selected goal
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedGoal = {};
  }

  // PUT
  updateGoal() {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(`${this.apiUrl}/${this.selectedGoal.id}`, this.selectedGoal, { headers }).subscribe({
        next: () => {
          alert('Goal updated successfully');
          this.closeEditModal();
          this.getGoals();
        },
        error: (err) => alert('Failed to update goal'),
      });
    } else {
      console.log('No token found.');
    }
  }

  // DELETE
  deleteGoal(id: number): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe({
        next: () =>
          (this.goals = this.goals.filter((goal) => goal.id !== id)),
        error: (err) => alert('Failed to delete goal'),
      });
    }
  }

}
