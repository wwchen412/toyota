import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private $data: DataService, private route: ActivatedRoute) {}
  public isMobileLayout = false;
  public headerData$: Observable<any>;
  private paymentCode;
  @Input() headerSetting: any;

  ngOnInit() {
    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.headerData$ = this.$data.getPaymentSetting(this.paymentCode) || null;
  }
}
