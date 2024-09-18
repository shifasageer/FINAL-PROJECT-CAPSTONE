import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  formData = {
    username: '',
    emailaddress: '',
    password: '',
    confirmpassword: '',
    pincode: ''
  };
 
  constructor(private authService: AuthService, private router: Router) {}
 
  onSubmit() {
    // Call the service method to create the contact
    this.authService.registerUser(this.formData).subscribe({
      next: (data) => {
        console.log('User registered successfully:', data);
         this.router.navigate(['/login']);
        // Optionally, reset the form or navigate to another view
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

}
