import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WellbeingService {
  private apiUrl = 'http://localhost:9099/api/diet';
  private sleepUrl = 'http://localhost:8094/api/sleep-schedule'; // Updated URL
  private screenTimeUrl = 'http://localhost:8094/api/screen-time';
  private dietUrl = 'http://localhost:8094/api/diet';
  private wlbUrl = 'http://localhost:8094/api/work-life-balance';

  private userId = localStorage.getItem('userId');

  constructor(private http: HttpClient) {}

  //------------------SURVEY--------------------------//

  private result: any = null;

  setResult(result: any) {
    this.result = result;
  }

  getResult() {
    return this.result;
  }

  //-------------------------SLEEP-----------------------------//

  addSleepRecord(sleepRecord: any, userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.sleepUrl}?userId=${userId}`,
      sleepRecord
    );
  }

  getAverageDuration(period: string): Observable<any> {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    return this.http.get<any>(
      `${this.sleepUrl}/average-duration/${period}?userId=${userId}`
    );
  }

  getEstimatedSleepTime(): Observable<any> {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    return this.http.get<any>(`${this.sleepUrl}/estimated-sleep-time`, {
      params: { userId: userId || '' },
    });
  }

  getEstimatedWakeUpTime(): Observable<any> {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    return this.http.get<any>(`${this.sleepUrl}/estimated-wake-up-time`, {
      params: { userId: userId || '' },
    });
  }

  //----------------------------SCREENTIME-------------------------------------//

  addScreenTime(screenTime: any, userId: string | null): Observable<any> {
    const params = new HttpParams().set('userId', userId!);
    return this.http.post(`${this.screenTimeUrl}`, screenTime, { params });
  }

  getTotalScreenTimeForDate(
    date: string,
    userId: string | null
  ): Observable<number> {
    const params = new HttpParams().set('userId', userId!);
    return this.http.get<number>(`${this.screenTimeUrl}/total/${date}`, {
      params,
    });
  }

  getScreenTimeData(userId: string | null): Observable<any> {
    return this.http.get<any>(
      `${this.screenTimeUrl}/chartdata?userId=${userId}`
    );
  }

  //------------------------------DIET-------------------------------------------------//

  saveDiet(diet: any, userId: number): Observable<any> {
    return this.http.post<any>(`${this.dietUrl}/add?userId=${userId}`, diet);
  }

  getDietByDate(date: string, userId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.dietUrl}/date/${date}/user?userId=${userId}`
    );
  }

  //------------------------------------------WORK-LIFE-BALANCE--------------------//

  addWorkLifeBalance(workLifeBalance: any, userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<any>(this.wlbUrl, workLifeBalance, { params });
  }

  getWorkLifeBalanceByDate(date: string, userId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());

    return this.http.get<any>(`${this.wlbUrl}/date/${date}`, { params });
  }


  
}
