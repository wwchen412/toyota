import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  constructor(
    private $data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public isMobileLayout = false;
  public getPaymentDetail$: Observable<any>;
  private data;
  public paymentCode;
  public headerData$: Observable<any>;
  public errorPage;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.$data.getPaymentSetting(this.paymentCode).subscribe(res => {
      this.headerData$ = res;
    });
    this.data = this.$data.detail.subscribe(res => {
      this.$data.pageIsLoad(false);
      this.data = res;
      this.$data.setProgress(3);
      this.$data.PaymentCodeResultValidation(this.paymentCode).subscribe(
        res => {
          this.$data.pageIsLoad(true);

          if (!res.isSuccess) {
            this.router.navigate(['']);
          } else if (res.isSuccess && !res.isEndPayment) {
            this.errorPage = true;
          } else if (res.token) {
            this.$data.setAuth(res.token);
            this.getPaymentDetail$ = this.$data.getPaymentInfo();
          } else {
            this.router.navigate(['']);
          }
        },
        err => {
          this.$data.pageIsLoad(true);
          this.backToPayment();
        }
      );
    });
  }
  public printPage = () => window.print();
  public closewin() {
    let confirmLeave = confirm('Are you sure you want to leave this page?');
    if (confirmLeave === true) {
      if (
        navigator.userAgent.indexOf('Firefox') !== -1 ||
        navigator.userAgent.indexOf('Chrome') !== -1
      ) {
        const backlen = history.length;
        history.go(-backlen);
        window.location.replace('about:blank');
        window.close();
      } else {
        const backlen = history.length;
        history.go(-backlen);
        window.opener = null;
        window.location.replace('about:blank');
        window.open('', '_self');
        window.close();
        confirmLeave = false;
      }
    }
  }
  public backToPayment() {
    this.router.navigate(['payment/' + this.paymentCode]);
    // window.location.href = "payment/";
  }
}
