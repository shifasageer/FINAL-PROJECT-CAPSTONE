import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  userProfile: any = {};
  userId: number | null = null;
  constructor(private userService: AuthService) {}


  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId')); // Assuming userId is stored in localStorage
    if (this.userId) {
      this.loadUserProfile();
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  loadUserProfile(): void {
    if (this.userId !== null) {
      this.userService.getUserById(this.userId).subscribe({
        next: (profile) => {
          this.userProfile = profile;
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        }
      });
    }
  }


 
}
