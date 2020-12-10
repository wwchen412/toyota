import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { ResultComponent } from './result/result.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NotAvailableComponent } from './not-available/not-available.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

const routes: Routes = [
  {
    path: 'payment/:paymentCode',
    component: PaymentStatusComponent
  },
  // {
  //   path: "payment/:paymentCode",
  //   component: PaymentComponent
  // },
  // {
  //   path: "paymentInfo",
  //   component: PaymentInfoComponent
  // },
  // {
  //   path: "result/:paymentCode",
  //   component: ResultComponent
  // },
  // {
  //   path: 'paymentStatus',
  //   component: PaymentStatusComponent
  // },
  {
    path: 'notAvailable',
    component: NotAvailableComponent
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
