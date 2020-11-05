import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-nric',
  templateUrl: './nric.component.html',
  styleUrls: ['./nric.component.scss']
})
export class NricComponent implements OnInit {
  public nricCode;
  private page: string;
  private auth: string;
  public error;
  public errorMsg;
  constructor(private $data: DataService) {}
  ngOnInit() {
    this.$data.currentPage.subscribe(page => (this.page = page));
    this.$data.authToken.subscribe(auth => (this.auth = auth));
  }
  postpaymentCodeValidation($event) {
    ($event.target as HTMLButtonElement).disabled = true;
    this.$data.statusValidate(this.nricCode).subscribe(
      res => {
        ($event.target as HTMLButtonElement).disabled = false;
        if (res['isSuccess']) {
          this.$data.setAuth(res['token']);
          this.sendOTP();
          this.$data.changePage('1');
        } else {
          this.errorMsg = res['errorMessage'];
          this.error = true;
        }
      },
      err => {
        ($event.target as HTMLButtonElement).disabled = false;
      }
    );
  }
  sendOTP() {
    this.$data.sendOTP().subscribe(
      result => {
        this.$data.setOtpMsg(result.ResponseData.Message);
      },
      err => {
        console.log(err);
      }
    );
  }
}
