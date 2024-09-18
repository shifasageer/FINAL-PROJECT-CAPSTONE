import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css'
})
export class MenuPageComponent {
  constructor(private router: Router) {}
 
  navigateToFeature(feature: string) {
    // Navigate to the route based on the feature parameter
    this.router.navigate([`/${feature}`]);

}

viewContacts() {
  this.router.navigate(['/viewcontacts']);
}
}