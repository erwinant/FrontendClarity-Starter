import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserLogin } from "src/app/data/schema/user-login";
import { AppConfig } from "../app-config";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  apiUrl = AppConfig.config.apiUrl;
  constructor(private http: HttpClient) {}

  login(userLogin: UserLogin): Observable<any> {
    return this.http.post(this.apiUrl + "users/login", userLogin, {
      observe: "response"
    });
  }
}
