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
  public headerContactData;
  private page;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
  constructor(private $data: DataService) {}
  public isMobileLayout = false;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.sendOTP();
    this.otpMsg$ = this.$data.otpMsg;
    this.$data.getOtpSetting().subscribe(res => {
      this.pinLength = res.responseData.pinLength;
      this.resendInSeconds = res.responseData.resendInSeconds;
      this.resendCount = res.responseData.resendInSeconds;

      const headerContactData = {
        contactEmail: res.responseData.contactEmail,
        contactNumber: res.responseData.contactNumber,
        homeUrl: res.responseData.homeUrl
      };
      this.headerContactData = headerContactData;
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
          sessionStorage.setItem('auth', result['Token']);
          // window.location.href = result['ResponseData'].CallbackUrl;
          window.location.href = '/paymentInfo';
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
