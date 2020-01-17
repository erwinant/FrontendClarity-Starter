import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { SecureLsService } from "src/app/shared/service/secure-ls.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private secureLsService: SecureLsService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.secureLsService.get("loggedApp")) {
      this.router.navigate(["auth"]);
      return false;
    }
    try {
      this.secureLsService.get("loggedApp");
      return true;
    } catch (error) {
      this.secureLsService.remove("loggedApp");
      this.router.navigate(["auth"]);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.secureLsService.get("loggedApp")) {
      this.router.navigate(["auth"]);
      return false;
    }
    try {
      this.secureLsService.get("loggedApp");
      return true;
    } catch (error) {
      this.secureLsService.remove("loggedApp");
      this.router.navigate(["auth"]);
      return false;
    }
  }
}
