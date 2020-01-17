import { Component, OnInit } from "@angular/core";
import { SecureLsService } from "src/app/shared/service/secure-ls.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  constructor(
    private secureLsService: SecureLsService,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router
  ) {}
  isCollapse = true;
  userLogin = this.secureLsService.get("loggedApp").profileUser;

  ngOnInit() {}

  logout() {
    this.ngxSpinnerService.show();
    this.secureLsService.removeAll();
    setTimeout(() => {
      this.ngxSpinnerService.hide();
      this.router.navigate(["/auth"]);
    }, 1000);
  }
}
