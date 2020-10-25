import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from '../otp/otp.component';
import { HeaderComponent } from '../header/header.component';
import { NricComponent } from '../nric/nric.component';
import { SelectionComponent } from '../selection/selection.component';
import { PaymentComponent } from '../payment/payment.component';
import { ResultComponent } from '../result/result.component';
import { LoadingPageComponent } from '../loading-page/loading-page.component';
import { DataService } from '../data.service';

@NgModule({
  declarations: [
    OtpComponent,
    HeaderComponent,
    NricComponent,
    SelectionComponent,
    PaymentComponent,
    ResultComponent,
    LoadingPageComponent,
  ],
  providers: [
    DataService,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaymentComponent
  ]
})
export class PaymentModule { }
