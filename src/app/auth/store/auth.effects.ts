import { Actions, ofType, Effect } from '@ngrx/effects';
import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from 'selenium-webdriver/http';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

export class AuthEffects {
    @Effect()

    authLogin = this.actions$.pipe(
      ofType(AuthActions.LOGIN_START)  
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true 
            }
            
        ).pipe(catchError(), map())
      }),
      
    );

    constructor(private actions$: Actions, private htttp: HttpClient) {}
}