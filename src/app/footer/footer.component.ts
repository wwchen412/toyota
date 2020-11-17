import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "../data.service";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  @Input() footerSetting: any;
  constructor(private $data: DataService) {}
  public isMobileLayout = false;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
  }
}
