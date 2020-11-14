import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-selection",
  templateUrl: "./selection.component.html",
  styleUrls: ["./selection.component.scss"]
})
export class SelectionComponent implements OnInit {
  constructor(private $data: DataService) {}

  public isMobileLayout = false;
  payChannel$: Observable<any>;
  payInfo$: Observable<any>;
  public headerData$: Observable<any>;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.headerData$ = this.$data.getPaymentSetting();
    this.payChannel$ = this.$data.getPayChannel();
    this.payInfo$ = this.$data.getPayInfo();
  }
  sumbitCardChannel() {
    this.$data.changePage("2");
    this.$data.setProgress(2);
  }
  public cancel() {
    if (
      navigator.userAgent.indexOf("Firefox") !== -1 ||
      navigator.userAgent.indexOf("Chrome") !== -1
    ) {
      window.location.href = "about:blank";
      window.close();
    } else {
      window.opener = null;
      window.open("", "_self");
      window.close();
    }
  }
}
