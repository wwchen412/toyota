import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtpComponent } from './otp/otp.component';
import { HeaderComponent } from './header/header.component';
import { NricComponent } from './nric/nric.component';
import { SelectionComponent } from './selection/selection.component';
import { PaymentComponent } from './payment/payment.component';
import { ResultComponent } from './result/result.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OtpComponent,
    HeaderComponent,
    NricComponent,
    SelectionComponent,
    PaymentComponent,
    ResultComponent,
    LoadingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
