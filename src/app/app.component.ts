import { Component } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import {
  Router,
  RouterEvent,
  RouteConfigLoadStart,
  RouteConfigLoadEnd
} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof RouteConfigLoadStart) {
        ngxSpinnerService.show();
      } else if (event instanceof RouteConfigLoadEnd) {
        ngxSpinnerService.hide();
      }
    });
  }
  
  title = "acset-clarity";
}
