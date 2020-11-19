import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  constructor(private $data: DataService, private route: ActivatedRoute) {}

  public isMobileLayout = false;
  public getPaymentDetail$: Observable<any>;
  private data;
  public paymentCode;
  public headerData$: Observable<any>;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);

    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.data = this.$data.detail.subscribe(res => {
      this.data = res;
      this.$data.setProgress(3);
      this.$data.PaymentCodeResultValidation(this.paymentCode).subscribe(
        res => {
          if (res.token) {
            this.$data.setAuth(res.token);
            this.headerData$ = this.$data.getPaymentSetting();
            this.getPaymentDetail$ = this.$data.getPaymentInfo();
          } else {
            this.backToPayment();
          }
        },
        err => {
          this.backToPayment();
          console.log(err);
        }
      );
    });
  }
  public printPage = () => window.print();
  // public windowClose = () => (open(location, '_self').close());
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
    window.location.href = 'payment/' + this.paymentCode;
  }
}
