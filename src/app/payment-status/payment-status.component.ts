import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  public page: string;
  public headerData$: Observable<any>;
  constructor(private $data: DataService) {}

  ngOnInit(): void {
    this.headerData$ = this.$data.getPaymentSetting();
    this.$data.currentPage.subscribe(page => (this.page = page));
  }
}
