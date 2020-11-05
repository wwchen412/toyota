import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private $data: DataService, private route: ActivatedRoute) {}

  public isMobileLayout = false;
  public page: string;
  loaded: boolean;
  auth: string;
  public paymentCode;
  ngOnInit() {
    this.$data.loading.subscribe(load => (this.loaded = load));
    this.$data.authToken.subscribe(auth => (this.auth = auth));

    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);

    this.$data.currentPage.subscribe(page => (this.page = page));
    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.$data.paymentCodeValidation(this.paymentCode).subscribe(
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
        this.$data.setOtpMsg(result.ResponseData.Message);
      },
      err => {
        console.log(err);
      }
    );
  }
}
