import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  constructor(private $data: DataService) {}

  public isMobileLayout = false;
  public getPaymentDetail$: Observable<any>;
  private data;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.data = this.$data.detail.subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.getPaymentDetail$ = this.$data.getPaymentDetail(this.data);
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
