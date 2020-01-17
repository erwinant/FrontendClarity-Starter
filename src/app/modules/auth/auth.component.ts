import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/service/auth.service";
import { map, delay, finalize, catchError } from "rxjs/operators";
import { SwalService } from "src/app/shared/service/swal.service";
import { of } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { SecureLsService } from "src/app/shared/service/secure-ls.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private swalService: SwalService,
    private secureLsService: SecureLsService,
    private ngxSpinnnerService: NgxSpinnerService
  ) {
    this.buildForm();
    if (this.secureLsService.get("loggedApp")) {
      try {
        this.secureLsService.get("loggedApp");
        this.router.navigate(["/landing"]);
      } catch (error) {
        this.secureLsService.removeAll();
      }
    }
  }

  ngOnInit() {}

  login() {
    const credentials = this.loginForm.value;
    this.ngxSpinnnerService.show();
    this.authService
      .login(credentials)
      .pipe(
        delay(5000),
        map(res => {
          if (res.status == 200) {
            this.swalService.toastSuccess(res.body.message);
            setTimeout(() => {
              this.secureLsService.set("loggedApp", res.body.data);
              this.router.navigate(["/landing"]);
            }, 900);
          } else {
            this.swalService.toastError(res.error);
          }
        }),
        finalize(() => this.ngxSpinnnerService.hide()),
        catchError(error => of(this.swalService.httpErrorResponse(error)))
      )
      .subscribe();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      password: [
        "",
        [Validators.required, Validators.minLength(8), Validators.maxLength(30)]
      ]
    });
  }
}
