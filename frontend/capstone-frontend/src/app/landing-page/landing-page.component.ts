import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent {
  quote: string | undefined;
  author: string | undefined;

  showCrisisSupport: boolean = false; // For toggling crisis support info
  private quoteInterval: any; // To hold the interval reference

  constructor(private router: Router, private contactService: ContactService) {}

  userId = this.getCurrentUserId();

  navigateToFeature(feature: string) {
    // Navigate to the route based on the feature parameter
    this.router.navigate([`/${feature}`]);
    this.showCrisisSupport = !this.showCrisisSupport;
  }

  // latitude: number | undefined;
  // longitude: number | undefined;

  // getCurrentLocation(): void {
  //   this.contactService.getCurrentPosition().then(
  //     (coords) => {
  //       this.latitude = coords.latitude;
  //       this.longitude = coords.longitude;
  //     },
  //     (error) => {
  //       console.error('Error getting location', error);
  //       alert('Could not fetch your location. Please enable location services.');
  //     }
  //   );
  // }

  onSosClick(): void {
    const lat = '8.515475313336047';
    const lon = '76.89765991988219';
    // Replace with actual user ID

    this.contactService.sendSosSms(lat, lon, this.userId).subscribe({
      next: (response) => {
        console.log(response);
        alert('SOS message sent successfully!');
      },
      error: (error) => {
        console.error('Failed to send SOS message:', error);
      },
    });
  }

  getCurrentUserId(): number {
    return parseInt(localStorage.getItem('userId')!, 10); // Retrieve userId from sessionStorage
  }

  goToWellbeing() {
    this.router.navigate([], { fragment: 'well' });
  }

  goToReport() {
    this.router.navigate([], { fragment: 'report' });
  }

  logOut(): void {
    // Clear the token and user ID from local storage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('wellbeingResult');
    localStorage.removeItem('workLifeBalanceScore');
    localStorage.removeItem('LastUpdated');
    // Navigate to the signup page
    this.router.navigate(['/login']);
  }
}
