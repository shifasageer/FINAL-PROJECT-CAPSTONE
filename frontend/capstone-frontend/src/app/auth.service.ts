import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:9099'; // Adjust this to your backend URL

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  // Login an existing user
  // 
  loginUser(emailaddress: string, password: string): Observable<any> {
    const loginData = {
      emailaddress,
      password,
    };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/userdetails`, {
      params: { id }
    });
  }
}
