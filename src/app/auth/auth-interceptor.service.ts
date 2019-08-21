import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
    
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                const modifyReq = req.clone({params: new HttpParams().set('auth', user.token)})
              return next.handle(modifyReq);
           }

}