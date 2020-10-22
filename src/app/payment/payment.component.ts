import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router) { }

  public isMobileLayout = false;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 475;
  }

}
