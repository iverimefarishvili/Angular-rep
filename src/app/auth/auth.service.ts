import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


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
        .pipe(catchError(this.handleError));
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

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'uknown error';
            if (!error.error || !error.error.error) {
                return throwError(errorMessage);
            }
            switch (error.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This Email Already Exists!';
            }
            return throwError(errorMessage);
    }
}