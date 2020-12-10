import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-status-result',
  templateUrl: './status-result.component.html',
  styleUrls: ['./status-result.component.scss']
})
export class StatusResultComponent implements OnInit {
  public statusModule: string;
  public result$: Observable<any>;
  public headerData$: Observable<any>;
  constructor(private $data: DataService, private $route: ActivatedRoute) {}

  ngOnInit(): void {
    this.headerData$ = this.$data.getStatusSettings();
    // this.$route.queryParams.subscribe(params => {
    //   this.statusModule = params["module"].toLowerCase();
    // });
    this.result$ = this.$data.getPayment();
    // if (this.statusModule === "paymentstatus") {

    // } else if (this.statusModule === "applicationstatus") {
    //   this.result$ = this.$data.getApplication();
    // }
  }
}
