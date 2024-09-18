import { Component } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-contacts',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './view-contacts.component.html',
  styleUrl: './view-contacts.component.css'
})
export class ViewContactsComponent {
  contactArray: Contact[] = [];

  constructor(private contactservice: ContactService) {}
  
  userId = this.getCurrentUserId();

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
  
    this.contactservice.getContacts(this.userId).subscribe({
      next: (data) => {
        this.contactArray = data;
        console.log('Contacts fetched successfully:', data);
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      },
    });
  }

  getCurrentUserId(): number {
    return parseInt(localStorage.getItem('userId')!, 10); // Retrieve userId from sessionStorage
  }
}
