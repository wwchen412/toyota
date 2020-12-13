import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  public page: string;
  public headerData$: Observable<any>;
  public paymentCode;
  public loaded: boolean;
  private systemCode;
  constructor(private $data: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paymentCode = this.route.snapshot.paramMap.get('paymentCode');
    this.route.queryParams.subscribe(params => {
      this.systemCode = params['systemCode'];
    });
    this.$data.currentPage.subscribe(page => (this.page = page));
    this.$data.loading.subscribe(load => (this.loaded = load));
    this.$data.pageIsLoad(true);
  }
}
