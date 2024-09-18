import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: boolean = false;
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // Call the service method to create the contact
    this.authService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);

        const { id, token } = response;

        localStorage.setItem('userId', id.toString());
        localStorage.setItem('jwtToken', response.token);
        // sessionStorage.setItem('userId', userId.toString());
        console.log('Login successful', response.id);
        console.log('Login successful', token);
        this.loginSuccess = true;
        this.loginFailed = false;
        this.router.navigate(['/landing']);
        // Handle success (e.g., redirect to another page or store user information)
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginSuccess = false;
        this.loginFailed = true;
        // Handle error (e.g., show an error message)
      },
    });
  }
}
