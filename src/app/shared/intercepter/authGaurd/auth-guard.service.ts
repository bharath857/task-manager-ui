import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../../services/tasks-api/profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private profile: ProfileService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isAuthenticated = this.profile.getToken();
    let auth = false
    isAuthenticated?.length > 0 ? auth = true : false
    if (!auth) {
      this.router.navigate(['/'])
    }
    return auth
  }
}
