import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
    
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }

              const modifyReq = req.clone({params: new HttpParams().set('auth', user.token)})
              return next.handle(modifyReq);
           })
           )}

        }