import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-payment-status",
  templateUrl: "./payment-status.component.html",
  styleUrls: ["./payment-status.component.css"]
})
export class PaymentStatusComponent implements OnInit {
  public page: string;
  public headerData$: Observable<any>;
  public paymentCode;
  constructor(private $data: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paymentCode = this.route.snapshot.paramMap.get("paymentCode");
    this.$data.currentPage.subscribe(page => (this.page = page));
  }
}
