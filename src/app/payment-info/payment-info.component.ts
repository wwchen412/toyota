import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import AdyenCheckout from '@adyen/adyen-web';
// import '@adyen/adyen-web/dist/adyen.css';
@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  @ViewChild('payForm', { static: false }) private payFormRef: ElementRef;
  constructor(private $data: DataService, private elementRef: ElementRef) {}
  public isMobileLayout = false;
  paymentMethod;

  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
  }
  ngAfterViewInit(): void {
    this.$data.getPaymentMethod().subscribe(
      res => {
        this.paymentMethod = res;
        setTimeout(() => {
          this.setPaymentInit(res.ResponseData);
        }, 1000);
      },
      err => {}
    );
  }
  submitPay() {
    this.$data.changePage('result');
    this.$data.setProgress(3);
  }
  back() {
    this.$data.changePage('selection');
  }
  setPaymentInit(res) {
    const root = this;
    const payForm = this.payFormRef.nativeElement;
    const txtClientKey = res.clientKey;
    const paymentMethod = res.paymentMethods.filter(
      method => method.name === 'Credit Card'
    );
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
            // returnUrl: 'http://localhost:4200/paymentDetail',
            paymentMethod: paymentInfo,
            browserInfo: browserInfo,
            reference: oPamentInfo.referenceCode
          };
          console.log('oRequest', oRequest);
          root.$data.cardSubmission(oRequest).subscribe(
            res => {
              if (res.ResponseData.action) {
                const detailData = {
                  MD: res.ResponseData.action.data.MD,
                  PaRes: res.ResponseData.action.data.PaReq,
                  PaymentCode: oRequest.reference
                };
                sessionStorage.setItem(
                  'detailData',
                  JSON.stringify(detailData)
                );
                dropin.handleAction(res.ResponseData.action);
              } else {
                const detailData = {
                  MD: res.ResponseData.action.data.MD,
                  PaRes: res.ResponseData.action.data.PaReq,
                  PaymentCode: oRequest.reference
                };
                root.$data.setDetail({ ...detailData });
                root.$data.setProgress(3);
                root.$data.changePage('result');
              }
            },
            err => {
              console.log('err', err);
            }
          );
        };

        fnPayCreditCard(state.data.paymentMethod, state.data.browserInfo);
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

  // makePayment(data) {
  //   console.log('data', data);
  // }
}
