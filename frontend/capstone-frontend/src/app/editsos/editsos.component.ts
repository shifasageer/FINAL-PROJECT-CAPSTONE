import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-editsos',
  standalone: true,
  imports: [CommonModule, FormsModule,NgIf],
  templateUrl: './editsos.component.html',
  styleUrl: './editsos.component.css'
})
export class EditsosComponent {

  sosMessage: string = '';
  responseMessage: string | undefined;
  

  constructor(private http: HttpClient, private contactservice: ContactService) {}



  // ngOnInit(): void {
  //   this.loadSosMessage();
  // }

  // loadSosMessage(): void {
  //   const userId = localStorage.getItem('userId');
  //   this.contactservice.getSOSMessage(userId).subscribe({
  //     next: (message: string) => {
  //       this.sosMessage = message;
  //     },
  //     error: (error) => {
  //       console.error('Failed to load SOS message', error);
  //     }
  //   });
  // }

  onSubmit() {
    this.contactservice.updateSosMessage(this.sosMessage)
      .subscribe(
        {
          next: (data) => {
            this.responseMessage = data;
            // Optionally, reset the form or navigate to another view
            
          },
          error: (error) => {
            this.responseMessage = 'Failed to update message. Please try again later.';
            console.error('Error updating message:', error);
          }
        }
      );
  }
}
