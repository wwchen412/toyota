import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private $data: DataService) {}

  public isMobileLayout = false;
  public page: string;
  loaded: boolean;
  auth: string;

  ngOnInit() {
    this.$data.loading.subscribe(load => (this.loaded = load));
    this.$data.authToken.subscribe(auth => (this.auth = auth));

    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);

    this.$data.currentPage.subscribe(page => (this.page = page));
    this.$data.paymentCodeValidation().subscribe(
      res => {
        this.$data.setAuth(res.token);
        this.sendOTP();
      },
      err => {
        console.log(this.loaded);
        console.log(err);
      }
    );
  }
  sendOTP() {
    this.$data.sendOTP().subscribe(
      result => {
        this.loaded = true;
        console.log(result);
        this.$data.setOtpMsg(result.ResponseData.Message);
      },
      err => {
        console.log(err);
      }
    );
  }
}
