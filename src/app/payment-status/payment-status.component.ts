import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  public page: string;

  constructor(private $data: DataService) {}

  ngOnInit(): void {
    // this.$data.currentPage.subscribe(page => (this.page = page));
  }
}
