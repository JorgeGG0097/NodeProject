import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fitness-tracker-frontend';

  constructor(public authService: AuthService, private router: Router) {}

  // Logout function to log out the user and navigate to the login page
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
