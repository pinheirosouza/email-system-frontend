import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('user_token');
    if (token && !request.headers.has('Authorization')) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.error) {
          return throwError(error.error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
