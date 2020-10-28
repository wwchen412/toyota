import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private $data: DataService) {}

  public isMobileLayout = false;
  public loading = false;
  data;
  ngOnInit() {
    this.loading = true;
    this.$data.getRedirect().subscribe(
      result => {
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
    this.$data.statusValidate().subscribe(
      result => {
        console.log(result);
        this.loading = true;
      },
      err => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.loading = true;
    }, 3000);
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
  }
}
