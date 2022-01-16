import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = `${environment.BACKED_URL}/user`;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string) {
    return this.http.post(`${URL}/login`, {
      email,
      password,
    });
  }
  public create(user) {
    return this.http.post(`${URL}`, user);
  }
}
