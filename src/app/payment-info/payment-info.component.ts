import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import AdyenCheckout from '@adyen/adyen-web';
import { HttpClient } from '@angular/common/http';
// import '@adyen/adyen-web/dist/adyen.css';
@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  @ViewChild('payForm', { static: false }) private payFormRef: ElementRef;
  constructor(
    private $data: DataService,
    private elementRef: ElementRef,
    private $http: HttpClient
  ) {}
  public isMobileLayout = false;
  paymentMethod;
  public headerData$: Observable<any>;
  public tremsConfirm: boolean;
  public err: boolean;
  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
    this.headerData$ = this.$data.getPaymentSetting();
  }
  toggleTrems(evt) {
    this.tremsConfirm = evt.target.checked;
  }
  ngAfterViewInit(): void {
    this.$data.getPaymentMethod().subscribe(
      res => {
        this.paymentMethod = res;
        // console.log(this.paymentMethod);
        setTimeout(() => {
          this.setPaymentInit(res.ResponseData);
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }
  back() {
    this.$data.changePage('1');
  }
  setPaymentInit(res) {
    const root = this;
    const payForm = this.payFormRef.nativeElement;
    const txtClientKey = res.clientKey;
    const paymentMethod = res.paymentMethods;
    const oPaymentMethod = {
      groups: res.groups,
      paymentMethods: paymentMethod
    };
    const oPamentInfo = res.paymentInfo;
    const configuration = {
      paymentMethodsResponse: oPaymentMethod,
      clientKey: txtClientKey,
      locale: res.language,
      environment: res.environment,
      onSubmit: (state, dropin) => {
        const fnPayCreditCard = function(paymentInfo, browserInfo) {
          const oRequest = {
            paymentMethod: paymentInfo,
            browserInfo: browserInfo,
            reference: oPamentInfo.referenceCode
          };
          root.$data.cardSubmission(oRequest).subscribe(
            res => {
              console.log(res);
              if (res.ResponseData.action) {
                dropin.handleAction(res.ResponseData.action);
              } else {
                root.$data.setProgress(3);
                root.$data.changePage('3');
              }
            },
            err => {
              console.log('err', err);
            }
          );
        };
        if (this.tremsConfirm) {
          fnPayCreditCard(state.data.paymentMethod, state.data.browserInfo);
        } else {
          this.err = true;
        }

        // root.makePayment(state.data);
      },
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          enableStoreDetails: true,
          hideCVC: false,
          name: 'Credit or debit card'
        }
      }
    };

    const checkout = new AdyenCheckout(configuration);
    const dropin = checkout.create('dropin').mount(payForm);
  }
  openUrl(url) {
    window.open(url, '_blank');
  }
}
