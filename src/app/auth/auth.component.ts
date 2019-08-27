import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  error: string = null;
  //isLoading= false;
  

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  
  private closeSub: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.store.select('auth').subscribe(authStat => {
      //this.isLoading = authStat.loading;
      this.error = authStat.authError;
    });
    if (this.error) {
      this.showErrorAlert(this.error);
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    
    if (this.isLoginMode){
      //this.authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password})
      );
    } else {
      //this.authObs = this.authService.signup(email, password);
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}))
    }

    


    //this.authObs.subscribe(resData => {
    // console.log(resData);
    //  this.isLoading = false;
    //  this.router.navigate(['/recipes']);
    //},errorMessage => {
    //  console.log(errorMessage);
    //  this.error = errorMessage;
    //  this.showErrorAlert(errorMessage);
    //  this.isLoading = false;
    //});
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }

  }

  private showErrorAlert(message: string) {
    const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
  
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

}
