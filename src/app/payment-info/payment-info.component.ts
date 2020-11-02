import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  public isMobileLayout = false;
  constructor(private $data: DataService) {}
  paymentMethod$: Observable<any>;

  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.paymentMethod$ = this.$data.getPaymentMethod();
  }
  submitPay() {
    this.$data.changePage('result');
  }
}
