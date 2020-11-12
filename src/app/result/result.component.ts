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
    this.headerData$ = this.$data.getPaymentSetting();

    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.data = this.$data.detail.subscribe(res => {
      this.data = res;
      this.$data.setProgress(3);
      this.$data.paymentCodeValidation(this.paymentCode).subscribe(
        res => {
          if (res.token) {
            this.$data.setAuth(res.token);
          }

          // const detailData = JSON.parse(sessionStorage.getItem('detailData'));
          this.getPaymentDetail$ = this.$data.getPaymentInfo();
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  public printPage = () => window.print();
  // public windowClose = () => (open(location, '_self').close());
  public closewin() {
    if (
      navigator.userAgent.indexOf('Firefox') !== -1 ||
      navigator.userAgent.indexOf('Chrome') !== -1
    ) {
      window.location.href = 'about:blank';
      window.close();
    } else {
      window.opener = null;
      window.open('', '_self');
      window.close();
    }
  }
}
