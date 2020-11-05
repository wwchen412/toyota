import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const APIURL = 'https://api-uat.toyotafinancial.sg/';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private pageSource = new BehaviorSubject('0');
  private authSource = new BehaviorSubject('');
  public loadingSource = new BehaviorSubject(false);
  public progressSource = new BehaviorSubject(1);
  // otp
  private otpMsgSource = new BehaviorSubject('');
  // detail req
  private detailDataSource = new BehaviorSubject({});
  // header
  private contactDataSource = new BehaviorSubject({});

  loading = this.loadingSource.asObservable();
  currentPage = this.pageSource.asObservable();
  authToken = this.authSource.asObservable();
  otpMsg = this.otpMsgSource.asObservable();
  progress = this.progressSource.asObservable();
  detail = this.detailDataSource.asObservable();
  contactData = this.contactDataSource.asObservable();
  auth: string;
  constructor(private $http: HttpClient) {}

  pageIsLoad(status: boolean) {
    this.loadingSource.next(status);
  }
  changePage(page: string) {
    this.pageSource.next(page);
  }
  setProgress(page: number) {
    this.progressSource.next(page);
  }
  setAuth(token: string) {
    // console.log('token', token);
    this.authSource.next(token);
  }
  setContactData(data: any) {
    this.contactDataSource.next(data);
  }

  setOtpMsg(msg: string) {
    this.otpMsgSource.next(msg);
  }
  setDetail(data: any) {
    this.detailDataSource.next(data);
  }
  createHeader() {
    // console.log('HEADER', this.auth);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.auth}`);
    return headers;
  }

  getOtpSetting() {
    return this.$http.get<any>(APIURL + 'otp/api/OTPSettings');
  }

  sendOTP() {
    this.authToken.subscribe(auth => (this.auth = auth));
    return this.$http.post<any>(APIURL + 'otp/api/SendOtp', '', {
      headers: this.createHeader()
    });
  }
  reSendOTP() {
    return this.$http.post<any>(APIURL + 'otp/api/ResendOtp', '', {
      headers: this.createHeader()
    });
  }
  validateOTP(pin) {
    return this.$http.post(
      APIURL + 'otp/api/ValidateOTP',
      {
        pin: pin
      },
      {
        headers: this.createHeader()
      }
    );
  }
  paymentCodeValidation(paymentCode?: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const url = APIURL + 'payment/api/PaymentCodeValidation';
    return this.$http.post<any>(
      url,
      {
        paymentCode: paymentCode
          ? paymentCode
          : // : '2b75e57f-2d98-44f4-8774-89ea796ce63d', KWAN TEST
            // : 'b9229745-fec8-46d0-9987-fc3dbea3549c',
            'c38d60d3-ef86-46eb-8da9-d058c5b8d1ad',

        ModuleName: 'PaymentInfo',
        OtpMode: 'Email'
      },
      { headers: headers }
    );
  }
  getPayChannel() {
    return this.$http.get<any>(APIURL + 'payment/api/PaymentChannel', {
      headers: this.createHeader()
    });
  }
  getPayInfo() {
    return this.$http.get<any>(APIURL + 'payment/api/PaymentInfo', {
      headers: this.createHeader()
    });
  }
  getPaymentMethod() {
    return this.$http.get<any>(APIURL + 'payment/api/PaymentMethod', {
      headers: this.createHeader()
    });
  }
  cardSubmission(req) {
    // console.log('cardSubmission', req);
    return this.$http.post<any>(
      APIURL + 'payment/api/CardSubmission',
      { ...req },
      {
        headers: this.createHeader()
      }
    );
  }
  getPaymentDetail(data) {
    this.authToken.subscribe(auth => (this.auth = auth));
    return this.$http.post<any>(
      APIURL + 'payment/api/PaymentDetail ',
      {
        ...data
      },
      {
        headers: this.createHeader()
      }
    );
  }
  // TFSSG status API
  statusValidate(nricCode) {
    return this.$http.post(APIURL + 'status/api/IdentityValidation', {
      IdentityCode: nricCode,
      ModuleName: 'ApplicationStatus'
    });
  }
  getApplication() {
    return this.$http.get(APIURL + 'status/api/GetApplications', {
      headers: this.createHeader()
    });
  }
  getPayments() {
    return this.$http.get(APIURL + 'status/api/GetPayments', {
      headers: this.createHeader()
    });
  }
}
