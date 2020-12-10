import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nric',
  templateUrl: './nric.component.html',
  styleUrls: ['./nric.component.scss']
})
export class NricComponent implements OnInit {
  public nricCode;
  private page: string;
  private auth: string;
  public error;
  public errorMsg;
  public headerData$: Observable<any>;
  public paymentCode;
  public statusModule;
  constructor(
    private $data: DataService,
    private $route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.$data.currentPage.subscribe(page => (this.page = page));
    this.$data.authToken.subscribe(auth => (this.auth = auth));
    this.headerData$ = this.$data.getStatusSettings();
    this.paymentCode = this.$route.snapshot.paramMap.get('paymentCode');
    this.$route.queryParams.subscribe(params => {
      this.statusModule = params['module'];
    });
    this.$data.pageIsLoad(true);
  }
  postpaymentCodeValidation($event) {
    ($event.target as HTMLButtonElement).disabled = true;
    if (!!this.nricCode) {
      this.$data
        .paymentCodeValidation(this.paymentCode, this.nricCode)
        .subscribe(res => {
          ($event.target as HTMLButtonElement).disabled = false;
          if (res.isSuccess && !res.isEndPayment) {
            this.$data.setAuth(res['token']);
            this.sendOTP();
            this.$data.pageIsLoad(false);
            this.$data.changePage('1');
          } else if (res.isEndPayment) {
            this.router.navigate(['result/' + this.paymentCode]);
          } else {
            this.errorMsg = res['errorMessage'];
            this.error = true;
            ($event.target as HTMLButtonElement).disabled = false;
          }
        });
    } else {
      this.error = true;
      this.errorMsg = 'NRIC is required';
      ($event.target as HTMLButtonElement).disabled = false;
    }
  }
  sendOTP() {
    this.$data.sendOTP().subscribe(
      result => {
        this.$data.setOtpMsg(result.ResponseData.Message);
        this.$data.pageIsLoad(true);
      },
      err => {
        console.log(err);
      }
    );
  }
}
