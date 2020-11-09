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
  back() {
    this.$data.changePage("0");
  }
  setPaymentInit(res) {
    const root = this;
    const payForm = this.payFormRef.nativeElement;
    const txtClientKey = res.clientKey;
    const paymentMethod = res.paymentMethods.filter(
      method => method.name === "Credit Card"
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
            paymentMethod: paymentInfo,
            browserInfo: browserInfo,
            reference: oPamentInfo.referenceCode
          };
          root.$data.cardSubmission(oRequest).subscribe(
            res => {
              if (res.ResponseData.action) {
                dropin.handleAction(res.ResponseData.action);
              }
            },
            err => {
              console.log("err", err);
            }
          );
        };
        fnPayCreditCard(state.data.paymentMethod, state.data.browserInfo);
      },
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          enableStoreDetails: true,
          hideCVC: false,
          name: "Credit or debit card"
        }
      }
    };

    const checkout = new AdyenCheckout(configuration);
    const dropin = checkout.create("dropin").mount(payForm);
  }
}
