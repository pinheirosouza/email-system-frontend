import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MailDTO } from './dtos/mail.dto';
import { ReadMailDTO } from './dtos/read-mail.dto';

const URL = `${environment.BACKED_URL}/auth/mail`;

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

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
