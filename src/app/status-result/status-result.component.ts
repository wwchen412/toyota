import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
@Component({
  selector: "app-status-result",
  templateUrl: "./status-result.component.html",
  styleUrls: ["./status-result.component.scss"]
})
export class StatusResultComponent implements OnInit {
  public statusModule: string;
  public result$: Observable<any>;
  public headerData$: Observable<any>;
  public status: string;
  constructor(
    private $data: DataService,
    private $route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerData$ = this.$data.getStatusSettings();
    // this.$route.queryParams.subscribe(params => {
    //   this.statusModule = params["module"].toLowerCase();
    // });
    this.statusModule = this.router.url;
    if (this.statusModule.includes("payment")) {
      this.status = "paymentstatus";
      this.result$ = this.$data.getPayment();
    } else if (this.statusModule.includes("application")) {
      this.status = "applicationstatus";
      this.result$ = this.$data.getApplication();
    }
    console.log(this.status);
  }
}
