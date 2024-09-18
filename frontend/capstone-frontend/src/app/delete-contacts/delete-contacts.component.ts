import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-contacts.component.html',
  styleUrl: './delete-contacts.component.css',
})
export class DeleteContactsComponent {
  contactArray: Contact[] = [];
  selectedContactName: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    const userId = this.getCurrentUserId();
    this.getContacts(userId);
  }

  getContacts(userId: number): void {
    this.contactService.getContacts(userId).subscribe({
      next: (data) => {
        this.contactArray = data;
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      },
    });
  }

  onDelete(): void {
    const userId = this.getCurrentUserId();
    this.contactService
      .deleteContact(userId, this.selectedContactName)
      .subscribe({
        next: () => {
          this.message = 'Contact deleted successfully';
          this.getContacts(userId); // Refresh the contact list
        },
        error: (error) => {
          console.error('Error deleting contact:', error);
          this.errorMessage = 'Failed to delete contact';
        },
      });
  }

  getCurrentUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }
}
