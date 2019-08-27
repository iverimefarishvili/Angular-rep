import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentificated = false;
  private userSub: Subscription;
  
  constructor(
    private dataStorageService: DataStorageService, 
    private authService: AuthService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.userSub = this.store
    .select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthentificated = !!user;
      console.log('sdasdsadasdsa');
      console.log(!user);
      console.log(!!user);
    });
  }

  storeData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
