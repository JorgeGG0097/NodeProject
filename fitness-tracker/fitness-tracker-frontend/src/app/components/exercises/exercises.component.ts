import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../auth.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent implements OnInit {
  exercises: any[] = [];
  newExercise = {name: '', description: '', category: ''};
  isEditModalOpen: boolean = false;
  selectedExercise: any = {};
  apiUrl = 'http://localhost:5000/api/exercises';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getExercises();
  }

  // GET
  getExercises(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any[]>(this.apiUrl, {headers}).subscribe({
        next: (response) => (this.exercises = response),
        error: (err) => alert('Failed to load exercises'),
      });
    } else {
      console.log('No token found.');
    }
  }

  // POST
  createExercise(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post<any>(`${this.apiUrl}/create`, this.newExercise, {headers}).subscribe({
        next: (response) => {
          this.exercises.push(response); // Añadir a la lista
          this.newExercise = {name: '', description: '', category: ''}; // Limpiar formulario
        },
        error: (err) => alert('Failed to create exercise'),
      });
    }
  }

  openEditModal(exercise: any) {
    this.selectedExercise = { ...exercise }; // Clonamos el ejercicio seleccionado
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedExercise = {};
  }

  // PUT
  updateExercise() {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(`http://localhost:5000/api/exercises/${this.selectedExercise.id}`, this.selectedExercise, { headers }).subscribe({
        next: () => {
          alert('Exercise updated successfully');
          this.closeEditModal();
          this.getExercises();
        },
        error: (err) => alert('Failed to update exercise'),
      });
    } else {
      console.log('No token found.');
    }
  }

  // DELETE
  deleteExercise(id: number): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete(`${this.apiUrl}/${id}`, {headers}).subscribe({
        next: () =>
          (this.exercises = this.exercises.filter((exercise) => exercise.id !== id)),
        error: (err) => alert('Failed to delete exercise'),
      });
    }
  }

}
