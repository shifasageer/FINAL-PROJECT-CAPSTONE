import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8093/api/menu';
  private smsApiUrl = 'http://localhost:8093/sms';

  constructor(private http: HttpClient) {}

  createContact(contact: Contact): Observable<Contact> {
    const userId = contact.userId;
    const params = new HttpParams().set('userId', userId.toString());

    console.log('creating product via API...', contact);
    return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact, {
      params,
    });
  }
  getContacts(userId: number): Observable<Contact[]> {
    console.log('Requesting users  with ID:', userId);

    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`, { params });
  }

  // deleteContact(firstName: string): Observable<String> {
  //   console.log(`Deleting product with ID ${firstName}...`);
  //   return this.http.delete<String>(`${this.apiUrl}/contacts/${firstName}`,{responseType:'text' as 'json'});
  // }
  deleteContact(userId: number, firstName: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${userId}/contact?firstName=${firstName}`,{ responseType: 'text' as 'json' });
  }

  sendSosSms(lat: string, lon: string, userId: number): Observable<string> {
    console.log('Sending SOS SMS...');
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('userId', userId.toString()); // Include userId in the parameters

    return this.http.post<string>(
      `${this.smsApiUrl}/send`,
      {},
      { params, responseType: 'text' as 'json' }
    );
  }

  getSOSMessage(userId: string): Observable<string> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<string>(`${this.smsApiUrl}/getmessage`, { params });
  }

  updateSosMessage(newMessage: string): Observable<string> {
    return this.http.post(`${this.smsApiUrl}/edit/messageBody`, newMessage, {
      responseType: 'text',
    });
  }

  // getCurrentPosition(): Promise<{ latitude: number, longitude: number }> {
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const coords = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude
  //           };
  //           resolve(coords);
  //         },
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //     } else {
  //       reject(new Error('Geolocation is not supported by this browser.'));
  //     }
  //   });
  // }
}
