import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from '../otp/otp.component';
import { HeaderComponent } from '../header/header.component';
import { NricComponent } from '../nric/nric.component';
import { SelectionComponent } from '../selection/selection.component';
import { PaymentComponent } from '../payment/payment.component';
import { ResultComponent } from '../result/result.component';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { FooterComponent } from '../footer/footer.component';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { PaymentInfoComponent } from '../payment-info/payment-info.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PaymentStatusComponent } from '../payment-status/payment-status.component';
import { StatusResultComponent } from '../status-result/status-result.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { TermsComponent } from '../terms/terms.component';
import { AmountConverterPipe } from '../amount-converter.pipe';
import { NotAvailableComponent } from '../not-available/not-available.component';
@NgModule({
  declarations: [
    OtpComponent,
    HeaderComponent,
    NricComponent,
    SelectionComponent,
    PaymentComponent,
    PaymentInfoComponent,
    ResultComponent,
    LoadingPageComponent,
    FooterComponent,
    ProgressBarComponent,
    PaymentStatusComponent,
    StatusResultComponent,
    ErrorPageComponent,
    TermsComponent,
    AmountConverterPipe,
    NotAvailableComponent
  ],
  providers: [DataService],
  imports: [CommonModule, FormsModule, NgOtpInputModule],
  exports: [PaymentComponent]
})
export class PaymentModule {}
