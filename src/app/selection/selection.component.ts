import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  constructor(private $data: DataService) {}

  public isMobileLayout = false;
  payChannel$: Observable<any>;
  payInfo$: Observable<any>;
  public headerData$: Observable<any>;
  public payMethod: string;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.headerData$ = this.$data.getPaymentSetting();
    this.payChannel$ = this.$data.getPayChannel();
    this.payInfo$ = this.$data.getPayInfo();
    this.payMethod = 'CreditCard';
  }
  changeMethod(evt) {
    this.payMethod = evt.target.value;
  }
  sumbitCardChannel() {
    if (this.payMethod !== 'CreditCard') {
      window.location.href = '/notAvailable';
    } else {
      this.$data.changePage('2');
      this.$data.setProgress(2);
    }
  }
  public cancel() {
    let checkCancel = window.confirm(
      'Are you sure you want to quit the payment process?'
    );
    console.log(checkCancel);
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
