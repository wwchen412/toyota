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
  public page: string;

  public headerData$: Observable<any>;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.headerData$ = this.$data.getPaymentSetting();
    // .subscribe(res => {
    //   this.headerData = {
    //     aboutUsUrl: res.responseData.aboutUsUrl,
    //     contactEmail: res.responseData.contactEmail,
    //     contactNumber: res.responseData.contactNumber,
    //     logoUrl: res.responseData.logoUrl
    //   };
    // });
    this.$data.currentPage.subscribe(page => (this.page = page));
    this.payChannel$ = this.$data.getPayChannel();
    this.payInfo$ = this.$data.getPayInfo();
  }
  sumbitCardChannel() {
    this.$data.changePage('1');
    this.$data.setProgress(2);
  }
}
