  import { Component } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import {Router, RouterLink} from '@angular/router';
  import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  apiUrl: string = 'http://localhost:5000/api/users/create';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.http.post(this.apiUrl, userData).subscribe({
      next: () => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      },
    });
  }

}
