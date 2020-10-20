import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public loading = false;
  ngOnInit() {
    setTimeout(() => {
      this.loading = true;
    }, 3000);
  }
}
