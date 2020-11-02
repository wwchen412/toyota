import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public pinLength: number;
  public resendInSeconds: number;
  public resendCount: number;
  public otpMsg: string;
  private pin: string;
  constructor(private $data: DataService) {}

  ngOnInit() {
    this.$data.otpMsg.subscribe(msg => (this.otpMsg = msg));
    this.$data.getOtpSetting().subscribe(res => {
      this.pinLength = res.responseData.pinLength;
      this.resendInSeconds = res.responseData.resendInSeconds;
      this.resendCount = res.responseData.resendInSeconds;

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
        console.log('success', res);
        this.resendCount = this.resendInSeconds;
      },
      err => {
        console.log('err');
      }
    );
  }
  sumbitOtp() {
    this.$data.validateOTP(this.pin).subscribe(result => {
      this.$data.setAuth(result['Token']);
      // console.log(result['Token']);
      this.$data.changePage('selection');
    }),
      err => {
        console.log(err);
      };
  }
}
