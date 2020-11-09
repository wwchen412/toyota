import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  private statusModule: string;
  public headerData$: Observable<any>;
  constructor(private $data: DataService, private $route: ActivatedRoute) {}
  ngOnInit() {
    this.$data.currentPage.subscribe(page => (this.page = page));
    // this.$data.authToken.subscribe(auth => (this.auth = auth));
    // this.headerData$ = this.$data.getPaymentSetting();
    this.$route.queryParams.subscribe(params => {
      this.statusModule = params['module'];
      // console.log('statusModule', this.statusModule);
    });
  }
  postpaymentCodeValidation($event) {
    ($event.target as HTMLButtonElement).disabled = true;
    this.$data.statusValidate(this.nricCode, this.statusModule).subscribe(
      res => {
        ($event.target as HTMLButtonElement).disabled = false;
        if (res['isSuccess']) {
          sessionStorage.setItem('auth', res['token']);
          window.location.href = 'https://otp-uat.toyotafinancial.sg/';
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
