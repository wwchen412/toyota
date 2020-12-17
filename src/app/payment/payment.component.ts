import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(
    private $data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public isMobileLayout = false;
  public page: string;
  loaded: boolean;
  auth: string;
  public paymentCode;
  public headerData$: Observable<any>;
  ngOnInit() {
    this.loaded = false;
    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.headerData$ = this.$data.getPaymentSetting(this.paymentCode);
    this.$data.authToken.subscribe(auth => (this.auth = auth));

    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);

    this.$data.currentPage.subscribe(page => (this.page = page));

    this.$data.pageIsLoad(true);
    this.$data.loading.subscribe(load => (this.loaded = load));
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
