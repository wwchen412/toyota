import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { ResultComponent } from './result/result.component';
import { NricComponent } from './nric/nric.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OtpComponent } from './otp/otp.component';
import { SelectionComponent } from './selection/selection.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    pathMatch: 'full'
  },
  {
    path: 'payment/:paymentCode',
    component: PaymentComponent
  },
  {
    path: 'result/:paymentCode',
    component: ResultComponent
  },
  {
    path: 'paymentInfo',
    component: SelectionComponent
  },
  {
    path: 'paymentStatus',
    component: NricComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
