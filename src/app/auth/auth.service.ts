import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';


export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    
    user = new Subject<User>();

    constructor(private http: HttpClient){}

    signup(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLq8ncpz9kJNLh6XrMUTFVLYW5sA7I89c',
        {
            email: email,
            password: password,
            returnSecureToken: true 
        }
        )
        .pipe(catchError(this.handleError), tap(resData => {
            this.handeAuthentification(resData.email, resData.localId, resData.idToken, +resData.expiresIn )
        }));
    } 

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLq8ncpz9kJNLh6XrMUTFVLYW5sA7I89c',
            {
                email: email,
                password: password,
                returnSecureToken: true 
            }
            
        ).pipe(catchError(this.handleError));
    }

    private handeAuthentification(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
            const user = new User(
                email, 
                userId, 
                token,
                expirationDate);
                this.user.next(user);
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'uknown error';
            if (!error.error || !error.error.error) {
                return throwError(errorMessage);
            }
            switch (error.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This Email Already Exists!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exists!';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct';
            }
            return throwError(errorMessage);
    }
}