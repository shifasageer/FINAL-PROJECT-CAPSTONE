import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-live-location',
  standalone: true,
  imports: [NgIf, FormsModule, NgClass],
  templateUrl: './live-location.component.html',
  styleUrl: './live-location.component.css'
})
export class LiveLocationComponent implements OnInit {
  public watchId: number | null = null; // To store the watch ID
  public locationStatus: string = '';
  public error: string = ''; // Property to store error messages
 
  public manualLatitude: number | null = null;
  public manualLongitude: number | null = null;
  public manualLocationStatus: string = '';
  public isManualLocationSafe: boolean = true; // Flag to determine if the manual location is safe
 
  public isLiveTrackingSafe: boolean = true; // Flag to determine if live tracking is safe
 
  private map: L.Map | undefined;
  private currentMarker: L.Marker | undefined;
 
  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    this.initializeMap();
  }
 
  initializeMap() {
    // Initialize the map centered on TechnoPark Phase II
    this.map = L.map('map').setView([8.5712, 76.889], 13); // Centered on TechnoPark Phase II
 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
 
    // Optional: Add a marker to TechnoPark Phase II
    L.marker([8.5712, 76.889])
      .addTo(this.map)
      .bindPopup('UST Global, Technopark Phase II')
      .openPopup();
  }
 
  trackLocation() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
 
          console.log(`Lat: ${latitude}, Lng: ${longitude}`);
 
          this.http
            .get<{ message: string }>(
              `http://localhost:8093/track-location?latitude=${latitude}&longitude=${longitude}`
            )
            .subscribe(
              (response) => {
                this.locationStatus = response.message;
                this.isLiveTrackingSafe = response.message
                  .toLowerCase()
                  .includes('safe'); // Determine if live tracking is safe
                this.error = ''; // Clear any previous error messages
                this.updateMarker(latitude, longitude);
                console.log(this.locationStatus);
              },
              (error) => {
                this.error = 'Error fetching location: ' + error.message;
                this.isLiveTrackingSafe = false; // Set to false if there's an error
                console.error(this.error);
              }
            );
        },
        (error) => {
          this.error = 'Geolocation error: ' + error.message;
          this.isLiveTrackingSafe = false; // Set to false if there's a geolocation error
          console.error(this.error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
      console.log(this.error);
    }
  }
 
  stopTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      this.locationStatus = ''; // Clear the location status message on stop
      if (this.currentMarker) {
        this.map?.removeLayer(this.currentMarker);
      }
      console.log('Stopped tracking');
    }
  }
 
  submitManualLocation() {
    if (this.manualLatitude !== null && this.manualLongitude !== null) {
      this.http
        .get<{ message: string }>(
          `http://localhost:8093/track-location-manual?latitude=${this.manualLatitude}&longitude=${this.manualLongitude}`
        )
        .subscribe(
          (response) => {
            this.manualLocationStatus = response.message;
            this.isManualLocationSafe = response.message
              .toLowerCase()
              .includes('safe'); // Determine if the location is safe
            this.updateMarker(this.manualLatitude, this.manualLongitude); // Update marker with manual location
            console.log(this.manualLocationStatus);
          },
          (error) => {
            this.manualLocationStatus =
              'Error fetching location: ' + error.message;
            this.isManualLocationSafe = false; // Set to false if there's an error
            console.error(this.manualLocationStatus);
          }
        );
    }
  }
 
  private updateMarker(lat: number | null, lng: number | null) {
    if (lat !== null && lng !== null && this.map) {
      // Remove the previous marker if it exists
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
 
      // Add a new marker at the specified location
      this.currentMarker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup('Location')
        .openPopup();
 
      // Center the map on the new marker
      this.map.setView([lat, lng], 13);
    }
  }

}
