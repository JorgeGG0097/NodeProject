import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "";
  password = "";

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/goals'])
      },
      error: (err) => alert('Login failed')
    })
  }

}
