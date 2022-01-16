import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MailDTO } from './dtos/mail.dto';
import { ReadMailDTO } from './dtos/read-mail.dto';
import { io } from 'socket.io-client';
import { AuthService } from '../auth/auth.service';

const URL = `${environment.BACKED_URL}/auth/mail`;

@Injectable({
  providedIn: 'root',
})
export class MailService {
  public socket = io(environment.BACKED_URL);
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getNewMailsJoin = () => {
    console.log('opa');
    this.socket.emit('join', this.authService.getLoggedUserId());
    this.socket.on('mail', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  getMails(query) {
    return this.http.get(`${URL}/${query}`);
  }

  getMail(id: string) {
    return this.http.get(`${URL}/${id}`);
  }

  deleteMail(id: string) {
    return this.http.delete(`${URL}/${id}`);
  }

  sendMail(mail: MailDTO) {
    return this.http.post(`${URL}`, mail);
  }

  update(id: string, mail: MailDTO | ReadMailDTO) {
    return this.http.put(`${URL}/${id}`, mail);
  }
}
