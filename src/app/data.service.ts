import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private APIURL: string = environment.apiUrl;
  private pageSource = new BehaviorSubject('0');
  private authSource = new BehaviorSubject('');
  public loadingSource = new BehaviorSubject(false);
  public progressSource = new BehaviorSubject(1);
  public errorMsgSource = new BehaviorSubject('404 not found');
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
  errMsg = this.errorMsgSource.asObservable();
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
  setErrorMsg(msg: string) {
    this.errorMsgSource.next(msg);
  }
  createHeader() {
    // console.log('HEADER', this.auth);
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.auth}`);
    return headers;
  }

  getPaymentSetting() {
    this.authToken.subscribe(auth => (this.auth = auth));
    return this.$http.get<any>(this.APIURL + 'payment/api/PaymentSettings', {
      headers: this.createHeader()
    });
  }
  getOtpSetting() {
    return this.$http.get<any>(this.APIURL + 'otp/api/OTPSettings');
  }
  getStatusSettings() {
    return this.$http.get<any>(this.APIURL + 'status/api/StatusSettings');
  }
  sendOTP() {
    this.authToken.subscribe(auth => (this.auth = auth));
    return this.$http.post<any>(this.APIURL + 'otp/api/SendOtp', '', {
      headers: this.createHeader()
    });
  }
  reSendOTP() {
    return this.$http.post<any>(this.APIURL + 'otp/api/ResendOtp', '', {
      headers: this.createHeader()
    });
  }
  validateOTP(pin) {
    return this.$http.post(
      this.APIURL + 'otp/api/ValidateOTP',
      {
        pin: pin
      },
      {
        headers: this.createHeader()
      }
    );
  }
  paymentCodeValidation(nricCode, paymentCode?: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const url = this.APIURL + 'status/api/PaymentCodeValidation';
    return this.$http.post<any>(
      url,
      {
        nric: nricCode,
        paymentCode: paymentCode
      },
      { headers: headers }
    );
  }
  reSendOTPwithMode() {
    return this.$http.post<any>(
      this.APIURL + 'otp/api/ResendOTPWithMode',
      { otpMode: 'Sms' },
      {
        headers: this.createHeader()
      }
    );
  }
  PaymentCodeResultValidation(paymentCode: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    const url = this.APIURL + 'status/api/PaymentCodeResultValidation';
    return this.$http.post<any>(
      url,
      {
        paymentCode: paymentCode
      },
      { headers: headers }
    );
  }
  getPayChannel() {
    return this.$http.get<any>(this.APIURL + 'payment/api/PaymentChannel', {
      headers: this.createHeader()
    });
  }
  getPayInfo() {
    return this.$http.get<any>(this.APIURL + 'payment/api/PaymentInfo', {
      headers: this.createHeader()
    });
  }
  getPaymentMethod() {
    // console.log('getPaymentMethod');
    return this.$http.get<any>(this.APIURL + 'payment/api/PaymentMethod', {
      headers: this.createHeader()
    });
  }
  cardSubmission(req) {
    // console.log('cardSubmission', req);
    return this.$http.post<any>(
      this.APIURL + 'payment/api/CardSubmission',
      { ...req },
      {
        headers: this.createHeader()
      }
    );
  }
  getPaymentInfo() {
    this.authToken.subscribe(auth => (this.auth = auth));
    return this.$http.get<any>(this.APIURL + 'payment/api/PaymentInfo ', {
      headers: this.createHeader()
    });
  }
  // TFSSG status API
  statusValidate(nricCode, status) {
    return this.$http.post(this.APIURL + 'status/api/IdentityValidation', {
      IdentityCode: nricCode,
      ModuleName: status
    });
  }
  getApplication() {
    return this.$http.post(this.APIURL + 'status/api/GetApplications', '', {
      headers: this.createHeader()
    });
  }
  getPayment() {
    return this.$http.post(this.APIURL + 'status/api/GetPayment', '', {
      headers: this.createHeader()
    });
  }
}
