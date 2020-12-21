import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  constructor(private $data: DataService, private route: ActivatedRoute) {}

  public isMobileLayout = false;
  payChannel$: Observable<any>;
  payInfo$: Observable<any>;
  public headerData$: Observable<any>;
  public payMethod: string;
  private paymentCode;
  public methodValue;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.headerData$ = this.$data.getPaymentSetting(this.paymentCode);
    this.$data.getPayChannel().subscribe(res => {
      this.payChannel$ = res.ResponseData;
      this.methodValue = this.payChannel$[0].MethodName;
      this.payMethod = this.payChannel$[0].MethodName;
    });
    this.payInfo$ = this.$data.getPayInfo();
  }
  changeMethod(evt) {
    this.payMethod = this.methodValue;
  }
  sumbitCardChannel() {
    this.payMethod = this.methodValue;
    if (this.payMethod.replace(/\s/g, '').toLowerCase() !== 'creditcard') {
      window.location.href = '/notAvailable';
    } else {
      this.$data.changePage('3');
      this.$data.setProgress(3);
    }
  }
  public cancel() {
    let checkCancel = window.confirm(
      'Are you sure you want to quit the payment process?'
    );
    if (checkCancel === true) {
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
        checkCancel = false;
      }
    }
  }
}
