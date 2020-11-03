import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
@Component({
  selector: "app-nric",
  templateUrl: "./nric.component.html",
  styleUrls: ["./nric.component.scss"]
})
export class NricComponent implements OnInit {
  public nricCode;
  page: string;
  auth: string;
  constructor(private $data: DataService) {}
  ngOnInit() {
    this.$data.currentPage.subscribe(page => (this.page = page));
    this.$data.authToken.subscribe(auth => (this.auth = auth));
  }
  postpaymentCodeValidation($event) {
    ($event.target as HTMLButtonElement).disabled = true;
    // this.$data.paymentCodeValidation(this.nricCode).subscribe(
    //   result => {
    //     if (result.isSuccess) {
    //       const { token } = result;
    //       this.$data.setAuth(token);
    //       this.sendOTP();
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //     ($event.target as HTMLButtonElement).disabled = false;
    //   }
    // );
  }
}
