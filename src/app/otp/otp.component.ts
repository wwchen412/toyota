import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public pinLength: number;
  public resendInSeconds: number;
  public resendCount: number;
  public pin: string;
  public err: boolean;
  public otpMsg$: Observable<any>;
  public errMsg: string;
  public contactEmail: string;
  public contactNumber: string;
  private page;
  public headerData$: Observable<any>;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
  constructor(private $data: DataService) {}

  ngOnInit() {
    this.otpMsg$ = this.$data.otpMsg;
    this.$data.currentPage.subscribe(page => (this.page = page));
    this.$data.getOtpSetting().subscribe(res => {
      this.pinLength = res.responseData.pinLength;
      this.resendInSeconds = res.responseData.resendInSeconds;
      this.resendCount = res.responseData.resendInSeconds;
      this.headerData$ = res;
      console.log(this.headerData$);
      const headerContactData = {
        contactEmail: res.responseData.contactEmail,
        contactNumber: res.responseData.contactNumber,
        homeUrl: res.responseData.homeUrl
      };
      this.$data.setContactData(headerContactData);
      setInterval(() => {
        if (this.resendCount > 0) {
          this.resendCount--;
        } else {
          clearInterval();
        }
      }, 1000);
    });
  }
  onOtpChange(pin) {
    this.pin = pin;
  }
  reSendOtp() {
    this.$data.reSendOTP().subscribe(
      res => {
        this.resendCount = this.resendInSeconds;
      },
      err => {
        console.log('err');
      }
    );
  }
  sumbitOtp() {
    this.$data.validateOTP(this.pin).subscribe(
      result => {
        if (result['IsSuccess'] === true) {
          this.err = false;
          this.$data.setAuth(result['Token']);
          const nextPage = parseInt(this.page, 10) + 1;
          this.$data.changePage(nextPage.toString());
        } else {
          this.err = true;
          this.errMsg = result['errorMessage'];
        }
      },
      err => {
        this.err = true;
      }
    );
  }
  clearOtp() {
    this.ngOtpInputRef.setValue(null);
  }
}
