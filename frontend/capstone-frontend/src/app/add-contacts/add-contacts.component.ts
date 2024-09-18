import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-contacts.component.html',
  styleUrl: './add-contacts.component.css'
})
export class AddContactsComponent {

constructor(private contactservice: ContactService){}
 message : string ='';
  contact: Contact = {
    id: 0,
    firstName: '',
    contactNo: '',
    userId: 0
  };
  onSubmit() {
    const userId = this.getCurrentUserId();
    this.contact.userId = userId; 
   
   
    // Call the service method to create the contact
    this.contactservice.createContact(this.contact).subscribe({
      next: (data) => {
        this.message='Contact created successfully!';
        // Optionally, reset the form or navigate to another view
        
      },
      error: (error) => {
        console.error('Error creating contact:', error);
      }
    }
      
    );

}
getCurrentUserId(): number {
  return parseInt(localStorage.getItem('userId')!, 10); // Retrieve userId from sessionStorage
}


}
