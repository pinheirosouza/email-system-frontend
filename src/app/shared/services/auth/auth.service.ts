import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthSignInDTO } from './dtos/auth-signin.dto';
import { IAuthSignUpDTO } from './dtos/auth-signup.dto';
import { environment } from '../../../../environments/environment';
import { ICommonResponse } from '../../interfaces/commom-response';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

const URL = `${environment.BACKED_URL}`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  isLogged() {
    const token = localStorage.getItem('user_token');

    if (!token) return false;

    return true;
  }

  signUp(data: IAuthSignUpDTO) {
    return this.http.post<ICommonResponse>(`${URL}/noauth/register`, data);
  }

  signIn(data: IAuthSignInDTO) {
    return this.http.post<ICommonResponse<{ token: string }>>(
      `${URL}/user/login`,
      data
    );
  }

  signOut() {
    localStorage.removeItem('user_token');
    this.router.navigate(['login'], { preserveFragment: false });
  }

  getLoggedUserId() {
    const token = localStorage.getItem('user_token');
    const userId = helper.decodeToken(token)._id;

    return userId;
  }
}
