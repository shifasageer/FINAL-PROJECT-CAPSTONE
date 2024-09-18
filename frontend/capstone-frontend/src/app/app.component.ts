import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { MenuPageComponent } from './menu-page/menu-page.component';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, LandingPageComponent, MenuPageComponent, AppRoutingModule, NgApexchartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'capstone-frontend';
}
