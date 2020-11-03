import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import AdyenCheckout from "@adyen/adyen-web";
// import '@adyen/adyen-web/dist/adyen.css';
@Component({
  selector: "app-payment-info",
  templateUrl: "./payment-info.component.html",
  styleUrls: ["./payment-info.component.scss"]
})
export class PaymentInfoComponent implements OnInit {
  @ViewChild("payForm", { static: false }) private payFormRef: ElementRef;
  constructor(private $data: DataService, private elementRef: ElementRef) {}
  public isMobileLayout = false;
  paymentMethod;
  adyenConfig = {
    context: "test" // change it to `live` when going live.
  };

  ngOnInit() {
    this.isMobileLayout = window.innerWidth <= 475;
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 475);
  }
  ngAfterViewInit(): void {
    this.$data.getPaymentMethod().subscribe(
      res => {
        this.paymentMethod = res;
        console.log("res", res);
        setTimeout(() => {
          const payForm = this.payFormRef.nativeElement;
          this.setPaymentInit(res.ResponseData);
        }, 1000);
      },
      err => {}
    );
  }
  submitPay() {
    this.$data.changePage("result");
    this.$data.setProgress(3);
  }
  back() {
    this.$data.changePage('selection');
  }
  setPaymentInit(res) {
    const root = this;
    const payForm = this.payFormRef.nativeElement;
    const txtClientKey = res.clientKey;
    const oPaymentMethod = {
      groups: res.groups,
      paymentMethods: res.paymentMethods
    };
    const oPamentInfo = res.paymentInfo;
    const configuration = {
      paymentMethodsResponse: oPaymentMethod,
      clientKey: txtClientKey,
      locale: res.language,
      environment: res.environment,
      onSubmit: (state, dropin) => {
        console.log('state:', state, 'dropin:', dropin);

        const fnPayCreditCard = function(paymentInfo, browserInfo) {
          console.log('fnPayCreditCard starting');
          const oRequest = {
            returnUrl: 'http://localhost:4200/paymentDetail',
            paymentMethod: paymentInfo,
            browserInfo: browserInfo,
            reference: oPamentInfo.referenceCode
          };
          console.log('oRequest', oRequest);
          root.$data.cardSubmission(oRequest).subscribe(
            res => {
              console.log('res', res);
              // if (res.ResponseData.action) {
              //   dropin.handleAction(res.ResponseData.action);
              // } else {
              const detailData = {
                MD: res.ResponseData.action.data.MD,
                PaRes: res.ResponseData.action.data.PaReq,
                PaymentCode: oRequest.reference
              };
              console.log('detailData', detailData);
              root.$data.setDetail({ ...detailData });
              root.$data.setProgress(3);
              root.$data.changePage('result');
              // }
              // if (res.ResponseData !== undefined && res.ResponseData !== null) {
              //   // dropin.handleAction(res.ResponseData.action);
              //   checkout
              //     .createFromAction(res.ResponseData.action)
              //     .mount(payForm);
              // }

              // res.ResponseData.action.data for detail
              // dropin.handleAction(res.ResponseData.action);
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
